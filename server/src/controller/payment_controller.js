// get payment service static object from service folder
import PaymentService from '../service/payment_service.js';

// get user service static object from service folder
import UserService from '../service/user_service.js';

// import cloudinary for cloud storage file uploading
import cloudinary from '../config/cloudinary.js';

// import fs module for file manipulation
// eslint-disable-next-line no-unused-vars
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

      // if there are existing payment receipt data from the database
      if (payments.length != 0) {
        return res.status(200).json(payments);
      }

      // send the empty array of payments back to the client with appropriate status code
      return res.status(404).json(payments);
    } catch (err) {
      // if error has occurred, send server error status and message
      return res.status(500).json({ message: 'Server Error' });
    }
  },

  // payment receipt controller method to retrieve and return all payment receipts from the database with the given status
  getFilteredPayments: async (req, res) => {
    try {
      // retrieve all payment receipts from the database according to given status
      const payments = await PaymentService.getFilteredPayments(
        req.params.status
      );

      // if there are existing payment receipt data from the database
      if (payments.length != 0) {
        return res.status(200).json(payments);
      }

      // send the empty array of payments back to the client with appropriate status code
      return res.status(404).json(payments);
    } catch (err) {
      // if error has occurred, send server error status and message
      return res.status(500).json({ message: 'Server Error' });
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
      return res.status(500).json({ message: 'Server Error' });
    }
  },

  // payment receipt controller method to retrieve and return all payment receipts of a user from the database
  getUserPayments: async (req, res) => {
    try {
      const payments = await PaymentService.getUserPayments(
        req.params.username
      );

      // if there are payment receipts uploaded from user, send data back to client
      if (payments.length != 0) {
        return res.status(200).json(payments);
      }

      // if no payment receipts uploaded yet from user, send back empty array with appropriate status code
      return res.status(404).json(payments);
    } catch (err) {
      // if error has occurred, send server error status and message
      return res.status(500).json({ message: 'Server Error' });
    }
  },

  // payment receipt controller method to retrieve and return all payment receipts for an order set
  getOrderSetIdPayments: async (req, res) => {
    try {
      const payments = await PaymentService.getOrderSetIdPayments(
        req.params.orderSetId
      );

      // if there are payment receipts uploaded from user, send data back to client
      if (payments.length != 0) {
        return res.status(200).json(payments);
      }

      // if no payment receipts uploaded yet from user, send back empty array with appropriate status code
      return res.status(404).json(payments);
    } catch (err) {
      // if error has occurred, send server error status and message
      return res.status(500).json({ message: 'Server Error' });
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

      // get and rename uploaded payment file, and url path
      // image extensions
      const imgExtensions = ['png', 'jpg', 'jpeg', 'svg'];

      /* NOTE: USE IF UPLOADING ONLY TO LOCAL STORAGE */
      // // get file extension and create filename format for uploaded payment file
      // const ext = req.file.filename.substring(
      //   req.file.filename.indexOf('.') + 1
      // );
      // const filename = `payment-${uniqueId}.${ext}`;

      // // public subfolder directory where the payment file will be transferred and uploaded
      // let folder = 'payment_images';

      // // if uploaded payment file is not an image format
      // if (!imgExtensions.includes(ext)) {
      //   // payment file shall be transferred and uploaded to the payment_docs public subfolder
      //   folder = 'payment_docs';
      // }

      // // old path and new path
      // const origFilePath = `./src/public/${folder}/${req.file.filename}`;
      // const newFilePath = `./src/public/${folder}/${filename}`;

      // // rename uploaded report file
      // fs.renameSync(origFilePath, newFilePath);

      /* NOTE: USE IF UPLOADING WITH CLOUDINARY */
      // get uploaded file's extension and upload to cloudinary with designated filename format
      const ext = req.file.originalname.substring(
        req.file.originalname.indexOf('.') + 1
      );
      const filename = `payment-${uniqueId}`;
      // cloudinary directory where the order file will be uploaded
      let folder = 'payment_images';
      // if order file is not in image format
      if (!imgExtensions.includes(ext)) {
        // order file shall be uploaded to order_docs cloudinary directory
        folder = 'payment_docs';
      }
      // upload to cloudinary
      const result = await cloudinary.v2.uploader.upload(req.file.path, {
        public_id: filename,
        folder: folder,
      });

      // get first and last name of user
      const user = await UserService.getUser({ username: req.user.username });

      // create new payment receipt object
      const payment = {
        id: uniqueId,
        orderSetId: req.body.orderSetId,
        user: req.user.username,
        userFullName: user.firstname + ' ' + user.lastname,
        filename: result.public_id,
        filePath: result.secure_url,
        dateUploaded: formattedDate,
      };

      // add new payment receipt to database
      const receipt = await PaymentService.addPayment(payment);

      // pass new payment receipt back to client
      return res.status(201).json(receipt);
    } catch (err) {
      // if error has occurred, send server error status and message
      return res.status(500).json({ message: 'Server Error' });
    }
  },

  // payment receipt controller method to verify a payment receipt to the database
  verifyPayment: async (req, res) => {
    try {
      // get today's date
      const date = new Date();
      const year = date.getFullYear().toString();
      const month = (date.getMonth() + 1).toString().padStart(2, 0);
      const day = date.getDate().toString().padStart(2, 0);
      const formattedDate = `${year}-${month}-${day}`;

      // create verified payment data
      const verifiedPayment = {
        paymentAcc: req.body.paymentAcc,
        refNumber: req.body.refNumber,
        amount: parseFloat(req.body.amount),
        confirmed: true,
        dateConfirmed: formattedDate,
      };

      const result = await PaymentService.verifyPayment(
        req.params.id,
        verifiedPayment
      );

      // send result back to the client to indicate success
      return res.status(204).json(result);
    } catch (err) {
      // if error has occurred, send server error status and message
      return res.status(500).json({ message: 'Server Error' });
    }
  },

  // payment receipt controller method to delete a payment receipt from the database
  deletePayment: async (req, res) => {
    try {
      // delete a payment receipt from the database
      const result = await PaymentService.deletePayment({ id: req.params.id });

      // send result back to the client to indicate success
      return res.status(202).json(result);
    } catch (err) {
      // if error has occurred, send server error status and message
      return res.status(500).json({ message: 'Server Error' });
    }
  },
};

// export payment receipt controller object for routing
export default paymentController;
