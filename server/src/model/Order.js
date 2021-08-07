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
    required: false,
  },
  // email of customer
  email: {
    type: String,
    required: false,
  },
  // address of customer
  address: {
    type: String,
    required: false,
  },
  // contact number of customer
  contactNo: {
    type: String,
    required: false,
  },
  // payment method chosen by the customer
  payMethod: {
    type: String,
    required: false,
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
  // filename of the order's image
  img: {
    type: String,
    required: false,
  },
  // file path of the order's image
  imgPath: {
    type: String,
    required: false,
  },
  // price of the order
  price: {
    type: Number,
    required: false,
  },
  // current status of the order
  status: {
    type: String,
    required: false,
  },
  // dimensions/size of the order (width) in inches
  width: {
    type: String,
    required: true,
  },
  // dimensions/size of the order (width) in inches
  height: {
    type: String,
    required: true,
  },
  // frame option of the order (Canvas Print only)
  frameOption: {
    type: String,
    required: false,
  },
  // frame edges of a specific order (Canvas Print only)
  frameEdges: {
    type: String,
    required: false,
  },
  // frame finishing of a specific order (Canvas Print only)
  frameFinishing: {
    type: String,
    required: false,
  },
  // eyelets of the order (Tarpaulin only)
  eyelets: {
    type: Number,
    required: false,
  },
  // diecut of order (Sticker only)
  diecut: {
    type: String,
    required: false,
  },
  // other details (remarks) of the order
  remarks: {
    type: String,
    required: false,
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
