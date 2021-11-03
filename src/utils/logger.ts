import { createLogger, format, transports } from 'winston';
import config from '../config';

const { combine, label, timestamp, printf } = format;

// Make sure this exists
const LOG_FILE_PATH = config.logger.file || 'logs/error.log';

const file = new transports.File({ filename: LOG_FILE_PATH, level: 'error' });
const console = new transports.Console();

const logFormat = printf(({ level, message, label, timestamp }) => {
  return `${config.instance} | ${timestamp} [${label}] ${level}: ${message}`;
});

const logger = createLogger({
  level: config.logger.level,
  format: combine(label({ label: config.env }), timestamp(), logFormat),
  transports: [file]
});

if (config.env !== 'production') {
  logger.remove(file);
  logger.add(console);
}

export default logger;