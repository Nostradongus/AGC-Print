import app from './app.js';
import dotenv from 'dotenv-safe';
import logger from './logger/index.js';

// get .env config values
dotenv.config();

const { PORT, HOST } = process.env;

// setup application server
app.listen(PORT, () => {
  logger.info(`Listening on PORT:${PORT}`);
  logger.http(`http://${HOST}:${PORT}`);
});
