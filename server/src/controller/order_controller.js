// get order service static object from service folder
import OrderService from '../service/order_service.js';

const orderController = {
  /**
   * order controller method to retrieve and return all orders from the database
   * @param {*} req object containing information regarding the HTTP request
   * @param {*} res the response configured and sent back to the client
   * @return {*} if request is successful, sends an array of order document objects from the Order collection
   *             else, returns an error status and message indicating that the request is not successful
   */
  getAllOrders: async (req, res) => {
    try {
      // retrieve all orders from the database
      const orders = await OrderService.getAllOrders();
      // send the array of orders back to the client
      res.send(orders);
    } catch (err) {
      // if error has occurred, send server error status and message
      res.status(500).json({ message: 'Server Error' });
    }
  },
  
  /** 
   * @param {*} req object containing information regarding the HTTP request
   * @param {*} res the response configured and sent back to the client
   * @return {*} if request is successful, sends the requested order document object from the Order collection
   *             else, returns an error status and message indicating that the request is not successful
   */
  getUserOrders: async (req, res) => {
    try {
      const orders = await OrderService.getUserOrders();
  
      res.send(orders);
    } catch (err) {
      res.send(500).json({ message: 'Server Error' });
    }
  },

  /**
   * order controller method to retrieve and return a specific order from the database
   * @param {*} req object containing information regarding the HTTP request
   * @param {*} res the response configured and sent back to the client
   * @return {*} if request is successful, sends the requested order document object from the Order collection
   *             else, returns an error status and message indicating that the request is not successful
   */
  getOrder: async (req, res) => {
    try {
      // retrieve a specific order from the database given the id data from the request
      const order = await OrderService.getOrder(req.params.id);
      // if order exists in the database, send the data back to the client
      if (id != null) {
        return res.send(order);
      }
      // if order does not exist, send error status and message
      res.status(404).json({ message: 'Order not found!' });
    } catch (err) {
      // if error has occurred, send server error status and message
      res.status(500).json({ message: 'Server Error' });
    }
  },
  
  /**
   * order controller method to add a new order to the database
   * @param {*} req object containing information regarding the HTTP request
   * @param {*} res the response configured and sent back to the client
   * @return {*} if request is successful, sends the created order back to the client
   *             else, returns an error status and message indicating that the request is not successful
   */
  addOrder: async (req, res) => {
    try {
      // add new order to the database with the request data given
      const order = await OrderService.addOrder(req.body);
      // send order data back to the client to indicate success
      res.order(order);
    } catch (err) {
      // if error has occurred, send server error status and message
      res.status(500).json({ message: 'Server Error' });
    }
  },
};

// export order controller object for routing
export default orderController;
