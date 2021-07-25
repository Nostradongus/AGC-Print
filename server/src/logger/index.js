const buildDevLogger = require('./dev_logger');
const buildProdLogger = require('./prod_logger');

let logger = null;
const { NODE_ENV } = process.env;

if (NODE_ENV === 'development') {
  logger = buildDevLogger();
} else {
  logger = buildProdLogger();
}

module.exports = logger;
