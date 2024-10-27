import { Base, Table } from "./Base";
import { AVAILABLE_LOCALES, AVAILABLE_NEWS_TYPE } from "./const";

class BaseSeeder extends Base {
  constructor() {
    super();
  }

  public async locale() {
    const columns = ["locale"];
    const values = Object.values(AVAILABLE_LOCALES).map((locale) => [locale]);

    await this.writeToDatabase(Table.locale, columns, values);
  }

  public async newsType() {
    const columns = ["news_type"];
    const values = Object.values(AVAILABLE_NEWS_TYPE).map((newsType) => [
      newsType,
    ]);

    await this.writeToDatabase(Table.news_type, columns, values);
  }
}

async function handler(baseSeeder: BaseSeeder) {
  await baseSeeder.locale();
  await baseSeeder.newsType();
  await baseSeeder.disconnect();
}

const baseSeeder = new BaseSeeder();
handler(baseSeeder);
