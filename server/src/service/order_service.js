// get Order model in models folder
import Order from '../model/Order.js';

// create service object that contains methods for order data manipulation
const OrderService = {
  // this method retrieves and returns all order data in the database
  getAllOrders: async () => Order.find({}),
  // this method retrieves and returns all orders of a specific user
  getUserOrders: async (username) => Order.find({ user: username }),
  // this method retrieves and returns a specific order data based on given order id
  getOrder: async (data) => Order.findOne(data),
  // this method adds a new order data to the Order collection in the database
  addOrders: async (orderArr) => {
    // add new order/s data to the Order collection
    Order.insertMany(orderArr);

    // return back array of orders to the client
    return orderArr;
  },
};

// export order service object for order data creation and manipulation
export default OrderService;
