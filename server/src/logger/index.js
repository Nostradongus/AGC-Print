import buildDevLogger from './dev_logger.js';
import buildProdLogger from './prod_logger.js';

let logger = null;
const { NODE_ENV } = process.env;

if (NODE_ENV === 'development') {
  logger = buildDevLogger();
} else {
  logger = buildProdLogger();
}

export default logger;
