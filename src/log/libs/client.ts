import { createLogger, format, transports } from "winston";

const { combine, timestamp, prettyPrint } = format;

const logger = createLogger({
  format: format.json(),
  transports: [
    new transports.File({
      format: combine(timestamp(), prettyPrint()),
      filename: "logs/client.log",
    }),
  ],
});

export default logger;
