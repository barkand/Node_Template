import { createLogger, format, transports } from "winston";

const { combine, timestamp, prettyPrint } = format;

const logger = createLogger({
  format: format.json(),
  transports: [
    new transports.Console({
      format: combine(format.colorize(), format.simple()),
    }),
    new transports.File({
      format: combine(timestamp(), prettyPrint()),
      filename: "logs/error.log",
      level: "error",
    }),
    new transports.File({
      format: combine(timestamp(), prettyPrint()),
      filename: "logs/server.log",
    }),
  ],
});

export default logger;
