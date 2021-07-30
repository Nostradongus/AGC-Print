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
    const formattedDate = `${date.getFullYear().toString()} - 
                           ${(date.getMonth() + 1).toString().padStart(2, 0)} -
                           ${date.getDate().toString().padStart(2, 0)}`;

    // generate unique order id
    const uniqueId = uniqid();

    // rename uploaded image file
    const ext = orderData.image.filename.split('.');
    const imgPath = `/public/order-images/order-${uniqueId}.${ext[1]}`;
    fs.renameSync(
      `./public/order-images/${orderData.image.filename}.${ext[1]}`,
      `.${imgPath}`
    );

    // create new Order object using deep copy
    const newOrder = new Order({
      id: uniqueId,
      type: JSON.parse(JSON.stringify(orderData.order.type)),
      quantity: JSON.parse(JSON.stringify(orderData.order.quantity)),
      size: JSON.parse(JSON.stringify(orderData.order.size)),
      img: imgPath,
      frameEdges: null,
      frameFinishing: null,
      status: 'Processing',
      name: JSON.parse(JSON.stringify(orderData.order.name)),
      email: JSON.parse(JSON.stringify(orderData.order.email)),
      address: JSON.parse(JSON.stringify(orderData.order.address)),
      contactNo: JSON.parse(JSON.stringify(orderData.order.contactNo)),
      payMethod: JSON.parse(JSON.stringify(orderData.order.payMethod)),
      dateRequested: formattedDate,
    });

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

    // add new order to object array
    this.orders[newOrder.id] = newOrder;
  };

  // removes an order from the cart
  this.deleteOrder = function (id) {
    // delete uploaded image order first
    fs.unlink(`.${this.orders[id].imgPath}`, function (err) {
      if (err) {
        // if error has occurred, send server error status and message
        res.status(500).json({ message: 'Server Error' });
      }
    });

    // delete order object
    delete this.orders[id];
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
