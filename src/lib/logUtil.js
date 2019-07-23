"use strict";
const { createLogger, transports, format } = require("winston");
const { combine, timestamp, label, printf } = format;

const appFormat = printf(({ level, message, label, timestamp }) => {
  // 2019-07-19T16:06:39.320Z awesome_name [INFO ]: message here!!!
  return `${timestamp} ${label} [${level.toUpperCase().padEnd(5)}]: ${message}`;
});

const getLogger = loggerName =>
  createLogger({
    transports: [
      new transports.Console({
        level: process.env.LOG_LEVEL || "debug",
        format: combine(label({ label: loggerName }), timestamp(), appFormat)
      })
    ]
  });

module.exports = {
  getLogger
};
