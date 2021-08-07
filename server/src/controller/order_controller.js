// get order model object from model folder
import Order from '../model/Order.js';

// get order service static object from service folder
import OrderService from '../service/order_service.js';

// import fs module for file manipulation
import fs from 'fs';

// import uniqid module for unique id generator
import uniqid from 'uniqid';

// order controller object for order controller methods
const orderController = {
  // order controller method to retrieve and return all orders from the database
  getAllOrders: async (req, res) => {
    try {
      // retrieve all orders from the database
      const orders = await OrderService.getAllOrders();
      // send the array of orders back to the client
      return res.status(200).json(orders);
    } catch (err) {
      // if error has occurred, send server error status and message
      res.status(500).json({ message: 'Server Error' });
    }
  },

  // order controller method to retrieve and return all orders of a user from the database
  getUserOrders: async (req, res) => {
    try {
      const orders = await OrderService.getUserOrders(req.params.username);

      return res.status(200).json(orders);
    } catch (err) {
      res.status(500).json({ message: 'Server Error' });
    }
  },

  // order controller method to retrieve and return all past orders of a user from the database
  getUserPastOrders: async (req, res) => {
    try {
      const orders = await OrderService.getUserPastOrders(req.params.username);

      return res.status(200).json(orders);
    } catch (err) {
      res.status(500).json({ message: 'Server Error' });
    }
  },

  // order controller method to retrieve and return all past orders of a user from the database
  getUserCurrentOrders: async (req, res) => {
    try {
      const orders = await OrderService.getUserCurrentOrders(
        req.params.username
      );

      return res.status(200).json(orders);
    } catch (err) {
      res.status(500).json({ message: 'Server Error' });
    }
  },

  // order controller method to retrieve and return all active orders of users from the database
  getAllActiveOrders: async (req, res) => {
    try {
      const orders = await OrderService.getAllActiveOrders(req.params.username);

      return res.status(200).json(orders);
    } catch (err) {
      res.status(500).json({ message: 'Server Error' });
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
      res.status(500).json({ message: 'Server Error' });
    }
  },

  // order controller method to add new orders to the database
  addOrders: async (req, res) => {
    try {
      // add new order/s from the cart to the database
      const newOrders = await OrderService.addOrders(req.body.orders);

      // send order data back to the client to indicate success
      return res.status(200).json(newOrders);
    } catch (err) {
      // if error has occurred, send server error status and message
      res.status(500).json({ message: 'Server Error' });
    }
  },

  // order controller method to upload and manage temporary order image coming from the client user order cart
  addToCart: (req, res) => {
    // get today's date
    const date = new Date();
    const year = date.getFullYear().toString();
    const month = (date.getMonth() + 1).toString().padStart(2, 0);
    const day = date.getDate().toString().padStart(2, 0);
    const formattedDate = `${year}-${month}-${day}`;

    // generated unique order id
    const uniqueId = uniqid();

    // get and rename uploaded image, and url path
    const ext = req.file.filename.split('.');
    const filename = `order-${uniqueId}.${ext[1]}`;
    const origFilePath = `./src/public/order_images/${req.file.filename}`;
    const newFilePath = `./src/public/order_images/order-${uniqueId}.${ext[1]}`;
    fs.renameSync(origFilePath, newFilePath);

    // create new Order object using deep copy
    const newOrder = new Order({
      id: uniqueId,
      user: req.user.username,
      name: null,
      email: null,
      address: null,
      contactNo: null,
      payMethod: null, // TODO: temporary set to null and false required
      workerInCharge: null,
      type: JSON.parse(JSON.stringify(req.body.type)),
      quantity: JSON.parse(JSON.stringify(req.body.quantity)),
      img: filename,
      imgPath: newFilePath,
      price: null, // temporarily zero, will be changed by the printing company's employee
      status: 'Processing', // always at processing status at the creation of the order
      width: JSON.parse(JSON.stringify(req.body.width)),
      height: JSON.parse(JSON.stringify(req.body.height)),
      frameOption: null,
      frameEdges: null,
      frameFinishing: null,
      eyelets: null,
      diecut: null,
      remarks: null,
      dateRequested: formattedDate,
      dateShipped: null,
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

  // order controller method to delete uploaded temporary order image coming from the client user order cart
  deleteFromCart: (req, res) => {
    // delete uploaded order image
    fs.unlink(req.params.id, function (err) {
      if (err) {
        // if error has occurred, send server error status and message
        return res.status(500).json({ message: 'Server Error' });
      }

      return res.status(202).json({ message: 'Successfully deleted' });
    });
  },
};

// export order controller object for routing
export default orderController;
