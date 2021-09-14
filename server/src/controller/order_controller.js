// get order model object from model folder
import Order from '../model/Order.js';

// get order set model object from model folder
import OrderSet from '../model/OrderSet.js';

// get order service static object from service folder
import OrderService from '../service/order_service.js';

// import fs module for file manipulation
// eslint-disable-next-line no-unused-vars
import fs from 'fs';

// import cloudinary for cloud storage file uploading
import cloudinary from '../config/cloudinary.js';

// import uniqid module for unique id generator
import uniqid from 'uniqid';
import UserService from '../service/user_service.js';

// import nodemailer module for sending emails to clients
import nodemailer from 'nodemailer';

// import logger for terminal messages
import logger from '../logger/index.js';

// order controller object for order controller methods
const orderController = {
  // order controller method to retrieve and return all order sets from the database
  getAllOrderSets: async (req, res) => {
    try {
      // retrieve all orders from the database
      const orders = await OrderService.getAllOrderSets();

      // if there are existing order sets in the database
      if (orders.length != 0) {
        return res.status(200).json(orders);
      }

      // send back empty array with appropriate status code
      return res.status(404).json(orders);
    } catch (err) {
      // if error has occurred, send server error status and message
      return res.status(500).json({ message: 'Server Error' });
    }
  },

  // order controller method to retrieve and return all order sets from the database
  // according to filter option
  getAllOrderSetsFiltered: async (req, res) => {
    try {
      const orders = await OrderService.getAllOrderSetsFiltered(
        req.params.status
      );

      // if there are existing orders in the database
      if (orders.length != 0) {
        // send array of orders back to the client
        return res.status(200).json(orders);
      }

      // send empty array back to client with appropriate status code
      return res.status(404).json(orders);
    } catch (err) {
      return res.status(500).json({ message: 'Server Error' });
    }
  },

  // order controller method to retrieve and return all order sets of a user from the database
  getUserOrderSets: async (req, res) => {
    try {
      const orders = await OrderService.getUserOrderSets(req.params.username);

      // if there are existing orders in the database
      if (orders.length != 0) {
        // send array of orders back to the client
        return res.status(200).json(orders);
      }

      // send empty array back to client with appropriate status code
      return res.status(404).json(orders);
    } catch (err) {
      return res.status(500).json({ message: 'Server Error' });
    }
  },

  // order controller method to retrieve and return all order sets of a user from the database
  // according to filter option
  getUserOrderSetsFiltered: async (req, res) => {
    try {
      const orders = await OrderService.getUserOrderSetsFiltered(
        req.params.username,
        req.params.status
      );

      if (orders.length != 0) {
        return res.status(200).json(orders);
      }

      return res.status(404).json(orders);
    } catch (err) {
      return res.status(500).json({ message: 'Server Error' });
    }
  },

  // order controller method to retrieve and return all current order sets of a user from the database
  getUserActiveOrderSets: async (req, res) => {
    try {
      const orders = await OrderService.getUserActiveOrderSets(
        req.params.username
      );

      if (orders.length != 0) {
        return res.status(200).json(orders);
      }

      return res.status(404).json(orders);
    } catch (err) {
      return res.status(500).json({ message: 'Server Error' });
    }
  },

  // order controller method to retrieve and return all active order sets from the database
  getAllActiveOrderSets: async (req, res) => {
    try {
      const orders = await OrderService.getAllActiveOrderSets();

      if (orders.length != 0) {
        return res.status(200).json(orders);
      }

      return res.status(404).json(orders);
    } catch (err) {
      return res.status(500).json({ message: 'Server Error' });
    }
  },

  // order controller method to retrieve and return all past order sets from the database
  getAllPastOrderSets: async (req, res) => {
    try {
      const orders = await OrderService.getAllPastOrderSets();

      if (orders.length != 0) {
        return res.status(200).json(orders);
      }

      return res.status(404).json(orders);
    } catch (err) {
      return res.status(500).json({ message: 'Server Error' });
    }
  },

  // order controller method to retrieve and return a specific order from the database
  getOrder: async (req, res) => {
    try {
      // retrieve a specific order from the database given the id data from the request
      const order = await OrderService.getOrder({ id: req.params.id });
      // if order exists in the database, send the data back to the client
      if (order != null) {
        return res.status(200).json(order);
      }
      // if order does not exist, send error status and message
      return res.status(404).json({ message: 'Order not found!' });
    } catch (err) {
      // if error has occurred, send server error status and message
      return res.status(500).json({ message: 'Server Error' });
    }
  },

  // order controller method to retrieve and return a specific order set from the database
  getOrderSet: async (req, res) => {
    try {
      // retrieve a specific order set from the database given the id data from the request
      const orderSet = await OrderService.getOrderSet({ id: req.params.id });
      // if order set exists in the database, send the data back to the client
      if (orderSet != null) {
        return res.status(200).json(orderSet);
      }
      // if order does not exist, send error status and message
      return res.status(404).json({ message: 'Order set not found' });
    } catch (err) {
      // if error has occurred, send server error status and message
      return res.status(500).json({ message: 'Server Error' });
    }
  },

  // order controller method to retrieve and return all orders from an order set from the database
  getOrdersFromOrderSet: async (req, res) => {
    try {
      // retrieve a specific order set from the database given the id data from the request
      const orders = await OrderService.getOrdersFromOrderSet(req.params.id);
      // if order set exists in the database, send the data back to the client
      if (orders.length !== 0) {
        return res.status(200).json(orders);
      }
      // if order does not exist, send error status and message
      return res.status(404).json(orders);
    } catch (err) {
      // if error has occurred, send server error status and message
      return res.status(500).json({ message: 'Server Error' });
    }
  },

  // order controller method to add new order set to the database
  addOrderSet: async (req, res) => {
    try {
      // get today's date
      const date = new Date();
      const year = date.getFullYear().toString();
      const month = (date.getMonth() + 1).toString().padStart(2, 0);
      const day = date.getDate().toString().padStart(2, 0);
      const formattedDate = `${year}-${month}-${day}`;

      // generate new id for order set
      const uniqueId = uniqid();

      // assign generated unique order set id to all orders created
      for (let ctr = 0; ctr < req.body.orders.length; ctr++) {
        req.body.orders[ctr].orderSetId = uniqueId;
      }

      // get number of orders made by user and user's first name and last name
      const user = await UserService.getUser({ username: req.user.username });
      const orderNum = user.orderNum;

      // add generated unique id and date to order set
      const orderSet = new OrderSet({
        id: uniqueId,
        user: req.user.username,
        userFullName: user.firstname + ' ' + user.lastname,
        userOrderNum: orderNum.toString(),
        name: req.body.name,
        email: req.body.email,
        address: req.body.address,
        contactNo: req.body.contactNo,
        dateRequested: formattedDate,
      });

      // increment the number of orders made by user by 1
      // since a new order set was made
      await UserService.updateUserOrderNumber(req.user.username, orderNum + 1);

      // add new order/s from the cart to the database
      const newOrderSet = await OrderService.addOrderSet(
        orderSet,
        req.body.orders
      );

      // send order data back to the client to indicate success
      return res.status(200).json(newOrderSet);
    } catch (err) {
      // if error has occurred, send server error status and message
      return res.status(500).json({ message: 'Server Error' });
    }
  },

  // order controller method to create a temporary order object for user client local cart
  addToCart: async (req, res) => {
    // generated unique order id
    const uniqueId = uniqid();

    // get and rename uploaded order file, and url path
    // image extensions
    const imgExtensions = ['png', 'jpg', 'jpeg', 'svg'];

    /* NOTE: USE IF UPLOADING ONLY TO LOCAL STORAGE */
    // // get file extension and create filename format for uploaded order file
    // const ext = req.file.filename.substring(req.file.filename.indexOf('.') + 1);
    // const filename = `order-${uniqueId}.${ext}`;
    // // public subfolder directory where the order file will be transferred and uploaded
    // let folder = 'order_images';
    // // if uploaded order file is not an image format
    // if (!imgExtensions.includes(ext)) {
    //   // order file shall be transferred and uploaded to the order_docs public subfolder
    //   folder = 'order_docs';
    // }
    // // old path and new path
    // const origFilePath = `./src/public/${folder}/${req.file.filename}`;
    // const newFilePath = `./src/public/${folder}/${filename}`;
    // // rename uploaded order file
    // fs.renameSync(origFilePath, newFilePath);
    // create new Order object using deep copy
    // // create new Order object using deep copy
    // const newOrder = new Order({
    //   id: uniqueId,
    //   user: req.user.username,
    //   type: JSON.parse(JSON.stringify(req.body.type)),
    //   quantity: JSON.parse(JSON.stringify(req.body.quantity)),
    //   filename: filename,
    //   filePath: newFilePath,
    //   width: JSON.parse(JSON.stringify(req.body.width)),
    //   height: JSON.parse(JSON.stringify(req.body.height)),
    //   frameOption: null,
    //   frameEdges: null,
    //   frameFinishing: null,
    //   eyelets: null,
    //   diecut: null,
    //   remarks: null,
    // });

    /* NOTE: USE IF UPLOADING WITH CLOUDINARY */
    // get uploaded file's extension and upload to cloudinary with designated filename format
    const ext = req.file.originalname.substring(
      req.file.originalname.indexOf('.') + 1
    );
    const filename = `order-${uniqueId}`;
    // cloudinary directory where the order file will be uploaded
    let folder = 'order_images';
    // if order file is not in image format
    if (!imgExtensions.includes(ext)) {
      // order file shall be uploaded to order_docs cloudinary directory
      folder = 'order_docs';
    }
    // upload to cloudinary
    const result = await cloudinary.v2.uploader.upload(req.file.path, {
      public_id: filename,
      folder: folder,
    });

    // create new Order object using deep copy
    const newOrder = new Order({
      id: uniqueId,
      user: req.user.username,
      type: JSON.parse(JSON.stringify(req.body.type)),
      quantity: JSON.parse(JSON.stringify(req.body.quantity)),
      filename: result.public_id,
      filePath: result.secure_url,
      width: JSON.parse(JSON.stringify(req.body.width)),
      height: JSON.parse(JSON.stringify(req.body.height)),
      frameOption: null,
      frameEdges: null,
      frameFinishing: null,
      eyelets: null,
      diecut: null,
      remarks: null,
    });

    // FOR CANVAS PRINT
    // if frame option was specified in the order
    if (typeof req.body.frameOption !== 'undefined') {
      newOrder.frameOption = JSON.parse(JSON.stringify(req.body.frameOption));
    }
    // if frame edges were specified in the order
    if (typeof req.body.frameEdges !== 'undefined') {
      newOrder.frameEdges = JSON.parse(JSON.stringify(req.body.frameEdges));
    }
    // if frame finishings were specified in the order
    if (typeof req.body.frameFinishing !== 'undefined') {
      newOrder.frameFinishing = JSON.parse(
        JSON.stringify(req.body.frameFinishing)
      );
    }

    // FOR TARPAULIN
    // if there are eyelets specified in the order
    if (typeof req.body.eyelets !== 'undefined') {
      newOrder.eyelets = JSON.parse(JSON.stringify(req.body.eyelets));
    }

    // FOR STICKER
    // if diecut is specified in the order
    if (typeof req.body.diecut !== 'undefined') {
      newOrder.diecut = JSON.parse(JSON.stringify(req.body.diecut));
    }

    // if there are remarks about the order
    if (typeof req.body.remarks !== 'undefined') {
      newOrder.remarks = JSON.parse(JSON.stringify(req.body.remarks));
    }

    // pass generated order id, filename, and file path
    return res.status(201).json(newOrder);
  },

  // order controller method to delete uploaded temporary order file coming from the client user order cart
  deleteFromCart: async (req, res) => {
    // NOTE: USE WHEN DELETING FROM LOCAL STORAGE
    // // image file extensions
    // const imgExtensions = ['png', 'jpg', 'jpeg', 'svg'];

    // // get cart order item file extension
    // const ext = req.params.filename.substring(
    //   req.params.filename.indexOf('.') + 1
    // );

    // let path = '';

    // // if image file
    // if (imgExtensions.includes(ext)) {
    //   path = `./src/public/order_images/${req.params.filename}`;
    // } else {
    //   path = `./src/public/order_docs/${req.params.filename}`;
    // }

    // // delete uploaded order file
    // await fs.unlink(path, function (err) {
    //   if (err) {
    //     // if error has occurred, send server error status and message
    //     return res.status(500).json({ message: 'Server Error' });
    //   }

    //   return res.status(202).json({ message: 'Successfully deleted' });
    // });

    // NOTE: USE WHEN DELETING FROM CLOUDINARY
    const arr = req.params.filename.split('.');
    const publicId = arr[0] + '/' + arr[1];
    await cloudinary.uploader.destroy(publicId, function (result) {
      if (result.result === 'ok') {
        return res.status(202).json({ message: 'Successfully deleted' });
      }

      return res.status(500).json({ message: 'Server Error' });
    });
  },

  // order controller method to delete an order from the database
  deleteOrder: async (req, res) => {
    try {
      // delete an order from the database
      const result = await OrderService.deleteOrder({ id: req.params.id });

      // send result back to the client to indicate success
      return res.status(202).json(result);
    } catch (err) {
      // if error has occurred, send server error status and message
      return res.status(500).json({ message: 'Server Error' });
    }
  },

  // order controller method to delete an order set from the database
  deleteOrderSet: async (req, res) => {
    try {
      // delete the orders inside the order set
      await OrderService.deleteOrders({ orderSetId: req.params.id });
      // delete the order set from the database
      const result = await OrderService.deleteOrderSet({ id: req.params.id });

      // send order data back to the client to indicate success
      return res.status(202).json(result);
    } catch (err) {
      // if error has occurred, send server error status and message
      return res.status(500).json({ message: 'Server Error' });
    }
  },

  // order controller method to update an order set from the database
  updateOrderSet: async (req, res) => {
    try {
      const id = req.params.id;
      // data to be set on the order set
      const data = {};

      if (req.body.name) {
        data['name'] = req.body.name;
      }
      if (req.body.email) {
        data['email'] = req.body.email;
      }
      if (req.body.contactNo) {
        data['contactNo'] = `63${req.body.contactNo}`;
      }
      console.log('data:' + data.contactNo);
      if (req.body.address) {
        data['address'] = req.body.address;
      }
      if (req.body.status) {
        data['status'] = req.body.status;
      }
      if (req.body.price) {
        data['price'] = parseFloat(parseFloat(req.body.price).toFixed(2));
      }

      const result = await OrderService.updateOrderSet(id, data);
      return res.status(204).json(result);
    } catch (err) {
      return res.status(500).json({ message: 'Server Error' });
    }
  },

  // order controller method to update an order from the database
  updateOrder: async (req, res) => {
    try {
      const id = req.params.id;

      const data = {};

      // General details of each order
      if (req.body.quantity) {
        data['quantity'] = req.body.quantity;
      }
      if (req.body.width) {
        data['width'] = req.body.width;
      }
      if (req.body.height) {
        data['height'] = req.body.height;
      }
      if (req.body.price) {
        data['price'] = parseFloat(parseFloat(req.body.price).toFixed(2));
      }
      if (req.body.remarks) {
        data['remarks'] = req.body.remarks;
      }

      // Tarpaulin only details
      if (req.body.eyelets) {
        data['eyelets'] = req.body.eyelets;
      }

      // Sticker only details
      if (req.body.diecut) {
        data['diecut'] = req.body.diecut;
      }

      // Canvas Print only details
      if (req.body.frameOption) {
        data['frameOption'] = req.body.frameOption;
      }
      if (req.body.frameEdges) {
        data['frameEdges'] = req.body.frameEdges;
      }
      if (req.body.frameFinishing) {
        data['frameFinishing'] = req.body.frameFinishing;
      }

      // send result back to the client to indicate success
      const result = await OrderService.updateOrder(id, data);
      return res.status(204).json(result);
    } catch (err) {
      // if error has occurred, send server error status and message
      return res.status(500).json({ message: 'Server Error' });
    }
  },

  // order controller method to indicate that the order set has already been reported from the database
  updateOrderSetReported: async (req, res) => {
    try {
      // indicate that order set has been reported to the database
      const result = await OrderService.updateOrderSetReported({
        id: req.params.id,
        reported: req.body.status,
      });

      // send result back to the client to indicate success
      return res.status(204).json(result);
    } catch (err) {
      // if error has occurred, send server error status and message
      return res.status(500).json({ message: 'Server Error' });
    }
  },

  // user controller method to send an email to inform the client that their order is placed
  sendEmailOrderPlaced: async (req, res) => {
    try {
      // get the data of the client from the database
      const clientData = {
        name: req.body.name,
        email: req.body.email,
        orderId: req.body.id,
      };

      // create reusable transporter object using the default SMTP transport
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          // e-mail address of company 'bot'
          user: 'sweng.nodemailer@gmail.com',
          // password for the e-mail account
          pass: '1234567890Test',
        },
      });

      // send mail with defined transport object
      const emailFormat = await transporter.sendMail({
        // sender's e-mail address
        from: 'sweng.nodemailer@gmail.com',
        // receiver's e-mail address
        to: clientData.email,
        // subject of the e-mail
        subject: '[Order # ' + clientData.orderId + '] Order Confirmed',
        // content of the e-mail
        html:
          '<p>Dear ' +
          clientData.name +
          ',</p>' +
          '<p>Thank you for ordering with us. Your order with reference number <b>' +
          clientData.orderId +
          '</b> has been received by our staff and ' +
          'is currently being processed. The total project cost will ' +
          'be available within 24 hours. You may view the project cost at ' +
          'agcprint.com/orders.</p>' +
          '<p>Thank you and have a great day! </p>' +
          '<p>AGC Print </p>' +
          '<p>[Please do not reply to this email. This is an auto-generated message]</p>',
      });
      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
      logger.info('Message sent: ' + emailFormat.messageId);

      return res
        .status(201)
        .json('Order Placed E-mail Sent To ' + clientData.email + '!');
    } catch (err) {
      logger.info(err);
      return res.status(500).json({ message: 'Server Error' });
    }
  },
};

// export order controller object for routing
export default orderController;
