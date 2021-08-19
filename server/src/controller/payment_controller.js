// get payment service static object from service folder
import PaymentService from '../service/payment_service.js';

// import fs module for file manipulation
import fs from 'fs';

// import uniqid module for unique id generator
import uniqid from 'uniqid';

// payment receipt controller object for payment receipt controller methods
const paymentController = {
  // payment receipt controller method to retrieve and return all payment receipts from the database
  getAllPayments: async (req, res) => {
    try {
      // retrieve all payment receipts from the database
      const payments = await PaymentService.getAllPayments();
      // send the array of payments back to the client
      return res.status(200).json(payments);
    } catch (err) {
      // if error has occurred, send server error status and message
      res.status(500).json({ message: 'Server Error' });
    }
  },

  // payment receipt controller method to retrieve andreturn a specific payment receipt from the database
  getPayment: async (req, res) => {
    try {
      // retrieve a specific payment receipt from the database given the id data from the request
      const payment = await PaymentService.getPayment({ id: req.params.id });
      // if payment receipt exists in the database, send the data back to the client
      if (payment != null) {
        return res.status(200).json(payment);
      }
      // if payment receipt does not exist, send error status and message
      return res.status(404).json({ message: 'Payment receipt not found!' });
    } catch (err) {
      // if error has occurred, send server error status and message
      res.status(500).json({ message: 'Server Error' });
    }
  },

  // payment receipt controller method to retrieve and return all payment receipts of a user from the database
  getUserPayments: async (req, res) => {
    try {
      const payments = await PaymentService.getUserPayments(
        req.params.username
      );

      // if there are payment receipts uploaded from user, send data back to client
      if (payments != null) {
        return res.status(200).json(payments);
      }

      // if no payment receipts uploaded yet from user, send message
      return res
        .status(404)
        .json({ message: 'No payment receipts uploaded from user yet!' });
    } catch (err) {
      // if error has occurred, send server error status and message
      res.status(500).json({ message: 'Server Error' });
    }
  },

  // payment receipt controller method to add a new payment receipt to the database
  addPayment: async (req, res) => {
    try {
      // get today's date
      const date = new Date();
      const year = date.getFullYear().toString();
      const month = (date.getMonth() + 1).toString().padStart(2, 0);
      const day = date.getDate().toString().padStart(2, 0);
      const formattedDate = `${year}-${month}-${day}`;

      // generate new id for payment receipt
      const uniqueId = uniqid();

      // get and rename uploaded image, and url path
      const ext = req.file.filename.split('.');
      const filename = `payment-${uniqueId}.${ext[1]}`;
      const origFilePath = `./src/public/payment_images/${req.file.filename}`;
      const newFilePath = `./src/public/payment_images/payment-${uniqueId}.${ext[1]}`;
      fs.renameSync(origFilePath, newFilePath);

      // create new payment receipt object
      const payment = {
        id: uniqueId,
        orderSetId: req.body.orderSetId,
        title: req.body.title,
        user: req.user.username, // TODO: QAs, change this and revert it back once done with testing
        description: req.body.description,
        filename: filename,
        filePath: newFilePath,
        dateUploaded: formattedDate,
      };

      // add new payment receipt to database
      const result = await PaymentService.addPayment(payment);

      // pass new payment receipt back to client
      return res.status(201).json(result);
    } catch (err) {
      // if error has occurred, send server error status and message
      res.status(500).json({ message: 'Server Error' });
    }
  },

  // payment receipt controller method to delete a payment receipt from the database
  deletePayment: async (req, res) => {
    try {
      // delete a payment receipt from the database
      const result = await PaymentService.deletePayment({ id: req.params.id });

      // send result back to the client to indicate success
      return res.status(200).json(result);
    } catch (err) {
      // if error has occurred, send server error status and message
      res.status(500).json({ message: 'Server Error' });
    }
  },
};

// export payment receipt controller object for routing
export default paymentController;
