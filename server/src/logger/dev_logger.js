import winston from 'winston';
const { format, createLogger, transports, addColors } = winston;
const { combine, timestamp, printf, colorize, errors } = format;

const custom = {
  levels: {
    error: 0,
    info: 1,
    http: 2,
    debug: 3,
  },
  colors: {
    error: 'red',
    info: 'green',
    http: 'green',
    debug: 'blue',
  },
};

const logFormat = printf(({ level, message, stack, timestamp }) => {
  return `${timestamp} ${level}: ${stack || message}`;
});

addColors(custom.colors);

const buildDevLogger = () =>
  createLogger({
    levels: custom.levels,
    format: combine(
      colorize(),
      timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
      errors({ stack: true }),
      logFormat
    ),
    defaultMeta: { service: 'user-service' },
    transports: [new transports.Console()],
  });

export default buildDevLogger;
