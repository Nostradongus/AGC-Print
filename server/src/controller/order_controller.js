// get order service static object from service folder
import OrderService from '../service/order_service.js';

const orderController = {
  // order controller method to retrieve and return all orders from the database
  getAllOrders: async (req, res) => {
    try {
      // retrieve all orders from the database
      const orders = await OrderService.getAllOrders();
      // send the array of orders back to the client
      return res.json(orders);
    } catch (err) {
      // if error has occurred, send server error status and message
      res.status(500).json({ message: 'Server Error' });
    }
  },

  // order controller method to retrieve and return all orders of a user from the database
  getUserOrders: async (req, res) => {
    try {
      const orders = await OrderService.getUserOrders(req.params.username);

      return res.json(orders);
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
        return res.json(order);
      }
      // if order does not exist, send error status and message
      return res.json({ message: 'Order not found!' });
    } catch (err) {
      // if error has occurred, send server error status and message
      res.status(500).json({ message: 'Server Error' });
    }
  },

  // order controller method to add a new order to the database
  addOrder: async (req, res) => {
    try {
      // add new order to the database with the request data given
      const order = await OrderService.addOrder(req.body);

      // send order data back to the client to indicate success
      return res.json(order);
    } catch (err) {
      // if error has occurred, send server error status and message
      res.status(500).json({ message: 'Server Error' });
    }
  },
};

// export order controller object for routing
export default orderController;
