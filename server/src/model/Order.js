// import mongoose module for schema modeling
import mongoose from 'mongoose';

// order schema for user orders in the application
const OrderSchema = new mongoose.Schema({
  // unique id of order
  id: {
    type: String,
    required: true,
  },
  // user who made the order
  user: {
    type: String,
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
    required: true,
  },
  // worker / staff in charged of the order
  workerInCharge: {
    type: String,
    required: false,
  },
  // type of the order
  type: {
    type: String,
    required: true,
  },
  // quantity of the order
  quantity: {
    type: Number,
    required: true,
  },
  // file path of the image of the order
  img: {
    type: String,
    required: false, // TODO: to be updated and set to true, in front-end phase
  },
  // price of the order
  price: {
    type: Number,
    required: false,
  },
  // current status of the order
  status: {
    type: String,
    required: true,
  },
  // dimensions/size of the order (width)
  width: {
    type: String,
    required: true,
  },
  // dimensions/size of the order (width)
  height: {
    type: String,
    required: true,
  },
  // frame edges of a specific order
  frameEdges: {
    type: String,
    required: false,
  },
  // frame finishing of a specific order
  frameFinishing: {
    type: String,
    required: false,
  },
  // when the order was requested
  dateRequested: {
    type: String,
    required: true,
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
