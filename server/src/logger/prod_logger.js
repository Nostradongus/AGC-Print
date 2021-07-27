import winston from 'winston';
const { format, createLogger, transports } = winston;
const { combine, timestamp, errors, json } = format;

const custom = {
  levels: {
    error: 0,
    info: 1,
    http: 2,
    debug: 3,
  },
};

const buildProdLogger = () =>
  createLogger({
    levels: custom.levels,
    format: combine(timestamp(), errors({ stack: true }), json()),
    transports: [
      new transports.Console({ level: 'http' }),
      new transports.File({
        filename: 'logs/error.log',
        level: 'error',
      }),
      new transports.File({
        filename: 'logs/info.log',
        level: 'info',
      }),
      new transports.File({
        filename: 'logs/http.log',
        level: 'http',
      }),
      new transports.File({
        filename: 'logs/combined.log',
      }),
    ],
  });

export default buildProdLogger;
