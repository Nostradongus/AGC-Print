// import mongoose module for schema modeling
import mongoose from 'mongoose';

// order schema for user orders in the application
const OrderSchema = new mongoose.Schema({
  // unique id of order
  id: {
    type: Number,
    required: true,
  },
  // username of user who ordered
  user: {
    type: String,
    required: true,
  },
  // worker / staff in charged of the order
  workerInCharge: {
    type: String,
    required: false,
  },
  // details of the order
  description: {
    type: String,
    required: true,
  },
  // price of the order
  price: {
    type: Number,
    required: true,
  },
  // current status of the order
  status: {
    type: String,
    required: true,
  },
  // dimensions/size of the order
  size: {
    type: String,
    required: true,
  },
  // when the order was requested
  dateRequested: {
    type: String,
    required: false,
  },
  // when the order was shipped
  dateShipped: {
    type: String,
    required: false,
  },
});

// implement order schema as order model
const OrderModel = mongoose.model('Order', OrderSchema);

// export order model for data creation and manipulation
export default OrderModel;
