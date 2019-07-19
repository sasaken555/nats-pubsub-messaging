"use strict";
const { createLogger, transports, format } = require('winston');
const { combine, timestamp, label, printf } = format;

const appFormat = printf(({ level, message, label, timestamp }) => {
    return `${timestamp} ${label} [${level.toUpperCase()}]: ${message}`;
});

const getLogger = loggerName => createLogger({
    transports: [
        new transports.Console({
            level: process.env.LOG_LEVEL || "debug",
            format: combine(
                label({ label: loggerName }),
                timestamp(),
                appFormat,
            )
        })
    ]
});

module.exports = {
    getLogger
};
