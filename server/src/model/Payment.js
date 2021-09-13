// import mongoose module for schema modeling
import mongoose from 'mongoose';

// payment receipt schema for user payment uploads in the application
const PaymentSchema = new mongoose.Schema(
  {
    // unique id of payment receipt
    id: {
      type: String,
      required: true,
    },
    // id of order set being referred by the report
    orderSetId: {
      type: String,
      required: true,
    },
    // user who uploaded the payment receipt
    user: {
      type: String,
      required: true,
    },
    // full name (first and last name) of user who made the report
    userFullName: {
      type: String,
      required: true,
    },
    // filename of the uploaded payment receipt
    filename: {
      type: String,
      required: false,
      default: null,
    },
    // file path of the uploaded payment receipt
    filePath: {
      type: String,
      required: false,
      default: null,
    },
    // date when the payment receipt was uploaded
    dateUploaded: {
      type: String,
      required: true,
    },
    // date when the payment was received and confirmed by the staff
    dateConfirmed: {
      type: String,
      default: null,
      required: false,
    },
    // name of the bank used by the client to pay
    paymentAcc: {
      type: String,
      default: null,
      required: false,
    },
    // reference number given by account
    refNumber: {
      type: Number,
      default: null,
      required: false,
    },
    // amount shown by the receipt; updated by staff
    amount: {
      type: Number,
      default: -1,
      required: false,
    },
    // indicator if payment is already confirmed by staff
    confirmed: {
      type: Boolean,
      default: false,
      required: false,
    },
    // when the payment receipt file was created in the database
    timestamp: {
      type: Date,
      default: Date.now(),
    },
  },
  { timestamps: true }
);

// implement payment schema as payment model
const PaymentModel = mongoose.model('Payment', PaymentSchema);

// export payment model for data creation and manipulation
export default PaymentModel;
