// get Payment model in model folder
import Payment from '../model/Payment.js';

// create payment receipt model that contains methods for payment receipt data manipulation
const PaymentService = {
  // this method retrieves and returns all payment receipt data in the database
  // from most recent to least recent
  getAllPayments: async () => Payment.find({}).sort({ field: 'descending' }),

  // this method retrieves and returns a specific payment receipt data based on the given id
  getPayment: async (id) => Payment.findOne(id),

  // this method retrieves and returns all payment receipts of a specific user
  // from most recent to least recent
  getUserPayments: async (username) =>
    Payment.find({ user: username }).sort({ field: 'descending' }),

  // this method adds a new payment receipt data to the Payment collection in the database
  addPayment: async (payment) => {
    // insert new payment receipt to the database
    const newPayment = new Payment({
      id: payment.id,
      orderSetId: payment.orderSetId,
      title: payment.title,
      user: payment.user,
      description: payment.description,
      filename: payment.filename,
      filePath: payment.filePath,
      dateUploaded: payment.dateUploaded,
    });
    newPayment.save();

    // return back new payment receipt data to the client
    return newPayment;
  },

  // this method deletes an existing payment receipt from the database
  deletePayment: async (id) => Payment.deleteOne(id),
};

// export payment receipt service object for payment receipt data creation and manipulation
export default PaymentService;