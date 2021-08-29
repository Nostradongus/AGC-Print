// import mongoose module for schema modeling
import mongoose from 'mongoose';

// order schema for orders in the application
const OrderSchema = new mongoose.Schema(
  {
    // unique id of order
    id: {
      type: String,
      required: true,
    },
    // unique id of the order set where the order is contained
    orderSetId: {
      type: String,
      required: true,
    },
    // status of the specific order (Pending, Processing, Completed, Cancelled)
    status: {
      type: String,
      default: 'Pending',
    },
    // user who made the order
    user: {
      type: String,
      required: true,
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
    filename: {
      type: String,
      required: false,
    },
    // file path of the order's image
    filePath: {
      type: String,
      required: false,
    },
    // price of the order
    price: {
      type: Number,
      required: false,
      default: -1,
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
  },
  { timestamps: true }
);

// implement order schema as order model
const OrderModel = mongoose.model('Order', OrderSchema);

// export order model for data creation and manipulation
export default OrderModel;
