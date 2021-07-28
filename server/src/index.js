// modules
import dotenv from 'dotenv-safe';
import express from 'express';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import path from 'path';
import cors from 'cors';
import logger from './logger/index.js';
import mongoose from 'mongoose';

// routes
import indexRoutes from './routes/index_routes.js';
import userRoutes from './routes/user_routes.js';
import orderRoutes from './routes/order_routes.js';
import workerRoutes from './routes/worker_routes.js';

dotenv.config();
const { PORT, HOST, MONGO_URI, SECRET } = process.env;

// connect to agc-print database
// additional connection options
const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
};
// connect using mongoose
mongoose.connect(MONGO_URI, options, function (error) {
  if (error) throw error;
});

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

// implementation to server
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
app.use('/', indexRoutes);
app.use('/users', userRoutes);
app.use('/orders', orderRoutes);
app.use('/workers', workerRoutes);

app.listen(PORT, () => {
  logger.info(`Listening on PORT:${PORT}`);
  logger.http(`http://${HOST}:${PORT}`);
});
