require('dotenv-safe').config();
const express = require('express');
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express');
const connectDB = require('./config/connectDB');
const YAML = require('yamljs');
const path = require('path');
const cors = require('cors');
const logger = require('./logger');

connectDB();

const app = express();

const pathName = path.join(__dirname, 'config', 'swagger', 'swagger.yaml');
const specs = YAML.load(pathName);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use(
  morgan(process.env.NODE_ENV === 'development' ? 'dev' : 'combined', {
    stream: {
      write: (message) => {
        if (process.env.NODE_ENV === 'development') {
          logger.info(message);
        }
        logger.http(message);
      },
    },
  })
);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));

const { PORT, HOST } = process.env;

app.listen(PORT, () => {
  logger.info(`Listening on PORT:${PORT}`);
  logger.http(`http://${HOST}:${PORT}`);
});
