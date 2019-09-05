'use strict';

const { createLogger, format, transports } = require('winston');

module.exports = createLogger({
    format: format.combine(
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        format.errors({ stack: true }),
        format.splat(),
        format.json()
    ),
    transports: [new transports.File({ filename: 'errors.log', level: 'error' })],
    exceptionHandlers: [
        new transports.File({ filename: 'exceptions.log' })
    ]
});
