// Modules
import dotenv from 'dotenv-safe';
import express from 'express';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import path from 'path';
import cors from 'cors';
import logger from './logger/index.js';
import connectDB from './config/connectDB.js';

// Routes
import indexRoutes from './routes/index.js';
import userRoutes from './routes/users.js';

dotenv.config();

connectDB();

const app = express();
const __dirname = path.resolve();
const pathName = path.join(
  __dirname,
  'src',
  'config',
  'swagger',
  'swagger.yaml'
);
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
app.use('/', indexRoutes);
app.use('/users', userRoutes);

const { PORT, HOST } = process.env;

app.listen(PORT, () => {
  logger.info(`Listening on PORT:${PORT}`);
  logger.http(`http://${HOST}:${PORT}`);
});
