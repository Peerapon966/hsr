import pino, { LogFn } from "pino";

/**
 * transport version
 *
 * transport, when pushing log to multiple destinations, doesn't allow a custom format,
 * but works off the main thread so, ideally better performance than streams
 */

// interface LogFn {
//   <T extends IObj>(obj: T, msg?: string, ...args: any[]): void;
// }

// interface IObj {
//   location: string
//   [key: string]: any
// }

function getLocaleDateString() {
  const utcTimestamp = pino.stdTimeFunctions.epochTime();
  const localTimestamp = Number(
    utcTimestamp.slice(utcTimestamp.indexOf(":") + 1)
  );
  const date = new Date(localTimestamp);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");

  return `,"time":${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

const fileTransport = pino.transport({
  target: "pino/file",
  level: process.env.LOG_LEVEL ?? "debug",
  options: { colorize: true, destination: "logs/nextjs.log", mkdir: true },
});

const consoleTransport = pino.transport({
  target: "pino-pretty",
  level: "debug",
  options: { colorize: true, destination: 1 },
});

const fileLogger = pino(
  {
    level: process.env.LOG_LEVEL ?? "info",
    formatters: {
      level: (label: string) => {
        return { level: label.toUpperCase() };
      },
    },
    timestamp: getLocaleDateString,
  },
  fileTransport
);

const consoleLogger = pino(
  {
    level: process.env.LOG_LEVEL ?? "info",
    formatters: {
      level: (label: string) => {
        return { level: label.toUpperCase() };
      },
    },
    timestamp: pino.stdTimeFunctions.isoTime,
  },
  consoleTransport
);

export class Logger {
  public static fatal: LogFn = <T extends object>(
    obj: T,
    msg?: string,
    ...args: any[]
  ): void => {
    fileLogger.fatal(obj, msg!, ...args);
    consoleLogger.fatal(obj, msg!, ...args);
  };

  public static error: LogFn = <T extends object>(
    obj: T,
    msg?: string,
    ...args: any[]
  ): void => {
    fileLogger.error(obj, msg, ...args);
    consoleLogger.error(obj, msg, ...args);
  };

  public static warn: LogFn = <T extends object>(
    obj: T,
    msg?: string,
    ...args: any[]
  ): void => {
    fileLogger.warn(obj, msg, ...args);
    consoleLogger.warn(obj, msg, ...args);
  };

  public static info: LogFn = <T extends object>(
    obj: T,
    msg?: string,
    ...args: any[]
  ): void => {
    fileLogger.info(obj, msg, ...args);
    consoleLogger.info(obj, msg, ...args);
  };

  public static debug: LogFn = <T extends object>(
    obj: T,
    msg?: string,
    ...args: any[]
  ): void => {
    fileLogger.debug(obj, msg, ...args);
    consoleLogger.debug(obj, msg, ...args);
  };

  public static trace: LogFn = <T extends object>(
    obj: T,
    msg?: string,
    ...args: any[]
  ): void => {
    fileLogger.trace(obj, msg, ...args);
    consoleLogger.trace(obj, msg, ...args);
  };
}

/**
 * multistream version
 *
 * streams allows pushing log to multiple destinations with a custom format
 * but has a performance trade-off since it works on the main thread
 *
 * I personally didn't use this, but decided to leave it here as a reminder on how to use them
 */

// const streams = [
//   { stream: pino.destination('logs/nextjs.log') },
//   { stream: pretty() },
// ]

// const logger = pino(
//   {
//     level: process.env.LOG_LEVEL ?? 'info',
//     formatters: {
//       level: (label) => {
//         return { level: label.toUpperCase() }
//       },
//     },
//     timestamp: pino.stdTimeFunctions.isoTime,
//   },
//   pino.multistream(streams)
// );

// export { logger }
