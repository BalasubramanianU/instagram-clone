const winston = require("winston");

module.exports = function () {
  const logger = winston.createLogger({
    transports: [new winston.transports.File({ filename: "logs/errors.log" })],
  });

  process.on("uncaughtException", (err) => {
    logger.error(err);
  });

  process.on("unhandledRejection", (reason) => {
    logger.error(reason);
  });
};
