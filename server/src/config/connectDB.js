import mongoose from 'mongoose';
import logger from '../logger/index.js';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });

    logger.info(`DB Connected: ${conn.connection.host}`);
  } catch (err) {
    logger.error(err);
    process.exit(1);
  }
};

export default connectDB;
