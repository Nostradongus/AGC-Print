// modules
import express from 'express';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import path from 'path';
import cors from 'cors';
import logger from './logger/index.js';
import connectDatabase from './config/connectDB.js';

// routes
import indexRoutes from './routes/index_routes.js';
import userRoutes from './routes/user_routes.js';
import orderRoutes from './routes/order_routes.js';
import workerRoutes from './routes/worker_routes.js';
import reportRoutes from './routes/report_routes.js';
import paymentRoutes from './routes/payment_routes.js';
import adminRoutes from './routes/admin_routes.js';

// connect to AGC Print database
connectDatabase();

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
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: ['https://agcprint.netlify.app'],
    credentials: true,
  })
);

// for static public folder, containing the uploaded order / report / payment images and documents
app.use('/assets', express.static(__dirname + '/src/public/assets'));
app.use(
  '/order_images',
  express.static(__dirname + '/src/public/order_images')
);
app.use('/order_docs', express.static(__dirname + '/src/public/order_docs'));
app.use(
  '/report_images',
  express.static(__dirname + '/src/public/report_images')
);
app.use('/report_docs', express.static(__dirname + '/src/public/report_docs'));
app.use(
  '/payment_images',
  express.static(__dirname + '/src/public/payment_images')
);
app.use(
  '/payment_docs',
  express.static(__dirname + '/src/public/payment_docs')
);

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

// routes implementation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
app.use('/', indexRoutes);
app.use('/users', userRoutes);
app.use('/order', orderRoutes);
app.use('/report', reportRoutes);
app.use('/payment', paymentRoutes);
app.use('/workers', workerRoutes);
app.use('/admin', adminRoutes);

export default app;
