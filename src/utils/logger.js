import winston from 'winston';

export const logger = winston.createLogger({
    level: 'info', // Default log level
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
});

// Logger for dev
if (process.env.NODE_ENV === 'development') {
    logger.add(new winston.transports.Console({
        level: 'debug', // Log all levels
        format: winston.format.combine(
            winston.format.colorize(),
            winston.format.simple()
        )
    }));
}

// Logger for prod
if (process.env.NODE_ENV === 'production') {
    logger.add(new winston.transports.File({
        level: 'info',
        filename: './error.log',
        format: winston.format.simple(),
    }));
    logger.add(new winston.transports.Console({
        level: 'info',
        format: winston.format.combine(
            winston.format.simple(),
            winston.format.colorize({ all: true }),
        ),
    }));
}


export const addLogger = (req, res, next) => {
    req.logger = logger;
    /* req.logger.info(
      `${req.method} on ${req.url} - ${new Date().toLocaleTimeString()}`
    ); */
    next();
};

/* req.logger.info(
    `${req.method} on ${req.url} - ${new Date().toLocaleTimeString()}`
  ); */

export const loggerTest = (req, res) => {
    req.logger.silly("log de un silly");
    req.logger.debug("log de un debug");
    req.logger.info("log de una info");
    req.logger.warn("log de una warn");
    req.logger.error("log de una error");
    return res.json("testing")
}
