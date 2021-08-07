/* eslint-disable guard-for-in */
/* eslint-disable require-jsdoc */

// get order model object from model folder
import Order from './Order.js';

// import fs module for file manipulation
import fs from 'fs';

// import uniqid module for unique id generator
import uniqid from 'uniqid';

// cart object constructor for storing of orders to be sent
function Cart(sessionCart) {
  // order list
  this.orders = sessionCart.orders || {};

  // adds an order to the cart
  this.addOrder = function (orderData) {
    // get today's date
    const date = new Date();
    const year = date.getFullYear().toString();
    const month = (date.getMonth() + 1).toString().padStart(2, 0);
    const day = date.getDate().toString().padStart(2, 0);
    const formattedDate = `${year}-${month}-${day}`;

    // generate unique order id
    const uniqueId = uniqid();

    // get and rename uploaded image, and url path
    const ext = orderData.image.filename.split('.');
    const filename = `order-${uniqueId}.${ext[1]}`;
    const origFilePath = `./src/public/order_images/${orderData.image.filename}`;
    const newFilePath = `./src/public/order_images/order-${uniqueId}.${ext[1]}`;
    fs.renameSync(origFilePath, newFilePath);

    // create new Order object using deep copy
    const newOrder = new Order({
      id: uniqueId,
      user: orderData.user.username,
      name: null,
      email: null,
      address: null,
      contactNo: null,
      payMethod: null, // TODO: temporary set to null and false required
      workerInCharge: null,
      type: null,
      quantity: JSON.parse(JSON.stringify(orderData.order.quantity)),
      img: filename,
      imgPath: newFilePath,
      price: null, // temporarily zero, will be changed by the printing company's employee
      status: 'Processing', // always at processing status at the creation of the order
      width: JSON.parse(JSON.stringify(orderData.order.width)),
      height: JSON.parse(JSON.stringify(orderData.order.height)),
      frameOption: null,
      frameEdges: null,
      frameFinishing: null,
      eyelets: null,
      diecut: false,
      remarks: null,
      dateRequested: formattedDate,
      dateShipped: null,
    });

    // FOR CANVAS PRINT
    // if frame option was specified in the order
    if (typeof orderData.order.frameOption !== 'undefined') {
      newOrder.frameOption = JSON.parse(
        JSON.stringify(orderData.order.frameOption)
      );
    }
    // if frame edges were specified in the order
    if (typeof orderData.order.frameEdges !== 'undefined') {
      newOrder.frameEdges = JSON.parse(
        JSON.stringify(orderData.order.frameEdges)
      );
    }
    // if frame finishings were specified in the order
    if (typeof orderData.order.frameFinishing !== 'undefined') {
      newOrder.frameFinishing = JSON.parse(
        JSON.stringify(orderData.order.frameFinishing)
      );
    }

    // FOR TARPAULIN
    // if there are eyelets specified in the order
    if (typeof orderData.order.eyelets !== 'undefined') {
      newOrder.eyelets = JSON.parse(JSON.stringify(orderData.order.eyelets));
    }

    // FOR STICKER
    // if diecut is specified in the order
    if (typeof orderData.order.diecut !== 'undefined') {
      newOrder.diecut = JSON.parse(JSON.stringify(orderData.order.diecut));
    }

    // if there are remarks about the order
    if (typeof orderData.order.remarks !== 'undefined') {
      newOrder.remarks = JSON.parse(JSON.stringify(orderData.order.remarks));
    }

    // add new order to object array
    this.orders[newOrder.id] = newOrder;

    return newOrder.id;
  };

  // removes an order from the cart
  this.deleteOrder = function (id) {
    // delete uploaded image order first
    fs.unlink(this.orders[id].imgPath, function (err) {
      if (err) {
        // if error has occurred, send server error status and message
        res.status(500).json({ message: 'Server Error' });
      }
    });

    // delete order object
    delete this.orders[id];
  };

  // updates the details of an order from the cart (Delivery Information)
  this.updateOrder = function (id, data) {
    // add delivery information to specified order
    this.orders[id].name = data.name;
    this.orders[id].email = data.email;
    this.orders[id].address = data.address;
    this.orders[id].contactNo = data.contactNo;

    return id;
  };

  // checks if order is already added to the cart
  this.checkOrder = function (id) {
    return this.orders[id] != null ? true : false;
  };

  // transfers orders to an array to be returned back to client
  this.generateArr = function () {
    const arr = [];

    // get all orders in the orders attribute
    for (const id in this.orders) {
      arr.push(this.orders[id]);
    }

    return arr;
  };
}

// export cart object
export default Cart;
