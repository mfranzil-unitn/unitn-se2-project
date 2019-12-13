const winston = require('winston');

const config = require('@app/config');

// Read more about winston at https://github.com/winstonjs/winston

const transports = [];

if (process.env.NODE_ENV !== 'development') {
    transports.push(
        new winston.transports.Console({
            format: winston.format.simple()
        }),
        new winston.transports.Console({
            format: winston.format.combine(winston.format.json())
        })
    );
} else {
    transports.push(
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format(info => {
                    info.level = info.level.toUpperCase();
                    return info;
                })(),
                winston.format.colorize(),
                winston.format.json(),
                winston.format.printf(info => `${info.timestamp} [${info.label}] ${info.level}: ${info.message}`)
            )
        }),
    );
}

const LoggerInstance = winston.createLogger({
    level: config.logs.level,
    levels: winston.config.npm.levels,
    format: winston.format.combine(
        winston.format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }),
        winston.format.errors({ stack: true }),
        winston.format.colorize(),
        winston.format.prettyPrint(),
        winston.format.splat(),
        winston.format.json()
    ),
    transports
});

module.exports = LoggerInstance;

