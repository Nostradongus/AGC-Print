// import mongoose module for schema modeling
import mongoose from 'mongoose';

// order set schema for a set of orders in the application
const OrderSetSchema = new mongoose.Schema({
  // unique id of order set
  id: {
    type: String,
    required: true,
  },
  // user who made the order/s
  user: {
    type: String,
    required: true,
  },
  // the set of orders (Order objects)
  orders: {
    type: Array,
    required: true,
  },
  // name of customer
  name: {
    type: String,
    required: true,
  },
  // email of customer
  email: {
    type: String,
    required: true,
  },
  // address of customer
  address: {
    type: String,
    required: true,
  },
  // contact number of customer
  contactNo: {
    type: String,
    required: true,
  },
  // payment method chosen by the customer
  payMethod: {
    type: String,
    required: false,
    default: null,
  },
  // worker / staff in charged of the order set
  workerInCharge: {
    type: String,
    required: false,
    default: null,
  },
  // price of the whole order set
  price: {
    type: Number,
    default: -1,
  },
  // current status of the order set
  status: {
    type: String,
    default: 'Pending',
  },
  // when the order set was requested
  dateRequested: {
    type: String,
    required: true,
  },
  // when the order was shipped
  dateShipped: {
    type: String,
    default: null,
  },
});

// implement order set schema as order set model
const OrderSetModel = mongoose.model('OrderSet', OrderSetSchema);

// export order set model for data creation and manipulation
export default OrderSetModel;
