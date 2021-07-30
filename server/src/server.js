import app from './app.js';
import session from 'express-session';
import dotenv from 'dotenv-safe';
import logger from './logger/index.js';

// get .env config values
dotenv.config();

const { PORT, HOST, SECRET } = process.env;

// setup session to be used for user order cart
app.use(
  session({
    secret: SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

// setup application server
app.listen(PORT, () => {
  logger.info(`Listening on PORT:${PORT}`);
  logger.http(`http://${HOST}:${PORT}`);
});
