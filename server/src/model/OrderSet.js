// import mongoose module for schema modeling
import mongoose from 'mongoose';

// order set schema for a set of orders in the application
const OrderSetSchema = new mongoose.Schema(
  {
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
    // full name (first name and last name) of user
    userFullName: {
      type: String,
      required: true,
    },
    // nth order set made by user
    userOrderNum: {
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
    // remaining balance not yet paid to the order set
    remBalance: {
      type: Number,
      default: -1,
    },
    // current status of the order set
    status: {
      type: String,
      default: 'Pending',
      required: true,
    },
    // indicator if report has already been sent to this order set
    reported: {
      type: Boolean,
      default: false,
      required: false,
    },
    // indicator if downpayment has already been paid by user
    paidDownPayment: {
      type: Boolean,
      default: false,
      required: false,
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
  },
  { timestamps: true }
);

// implement order set schema as order set model
const OrderSetModel = mongoose.model('OrderSet', OrderSetSchema);

// export order set model for data creation and manipulation
export default OrderSetModel;
