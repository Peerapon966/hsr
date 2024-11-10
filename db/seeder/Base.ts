import mysql, { Connection } from "mysql2";

export enum Table {
  news_type = "news_type",
  locale = "locale",
  news = "news",
}

export abstract class Base {
  connection: Connection;

  constructor() {
    this.connection = this.getConnection();
  }

  /**
   *
   * @param {string} table // Table to insert, valid values can be seen in the Table enum
   * @param {string[]} columns // Columns to insert
   * @param {(string | number)[][]} values // Values to insert, each item represent a row
   */
  protected async writeToDatabase(
    table: Table,
    columns: string[],
    values: (string | number)[][]
  ) {
    const sanitizedColumns = columns.map((column) =>
      this.sanitizeString(column)
    );
    const sanitizedValues = values.reduce((acc: string, value) => {
      const sanitizedValue = value.map((item) => {
        if (typeof item === "number") return item;

        return this.encloseWithQuote(this.sanitizeString(item));
      });

      acc === ""
        ? (acc = acc.concat(`(${sanitizedValue.join(", ")})`))
        : (acc = acc.concat(`, (${sanitizedValue.join(", ")})`));
      return acc;
    }, "");
    const updates = sanitizedColumns.reduce((acc: string, column: string) => {
      acc === ""
        ? (acc = acc.concat(`${column} = new.${column}`))
        : (acc = acc.concat(`, ${column} = new.${column}`));
      return acc;
    }, "");
    const sql = `INSERT INTO ${table} (${sanitizedColumns.join(
      ", "
    )}) VALUES ${sanitizedValues} AS new ON DUPLICATE KEY UPDATE ${updates};`;

    try {
      const [results, _] = await this.connection.promise().execute(sql);
      console.log(results);
    } catch (error) {
      return error;
    }
  }

  private getConnection(): Connection {
    console.log("Connecting to the database ...");
    const connection = mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      port: Number(process.env.DB_PORT),
    });
    console.log("Connected to the database");

    return connection;
  }

  public async disconnect() {
    console.log("Disconnecting from the database ...");
    await this.connection.promise().end();
    console.log("Disconnected from the database");
  }

  protected async wait(ms: number) {
    return new Promise<void>((resolve) =>
      setTimeout(() => {
        resolve();
      }, ms)
    );
  }

  protected sanitizeString(string: string): string {
    const sanitizedStr = string.replaceAll(`'`, `\\'`).replaceAll(`"`, `\\"`);

    return sanitizedStr;
  }

  protected encloseWithQuote(string: string): string {
    return "'" + string + "'";
  }
}
