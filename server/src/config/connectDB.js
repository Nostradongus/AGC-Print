const mongoose = require('mongoose');
const logger = require('../logger');

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

module.exports = connectDB;
