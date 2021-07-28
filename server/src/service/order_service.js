// get Order model in models folder
import Order from '../model/Order.js';

// create service object that contains methods for order data manipulation
const OrderService = {
  // this method retrieves and returns all order data in the database
  getAllOrders: async () => Order.find({}),
  // this method retrieves and returns all orders of a specific user
  getUserOrders: async (username) => Order.find({ user: username }),
  // this method retrieves and returns a specific order data based on given order id
  getOrder: async (id) => Order.findOne({ id }),
  // this method adds a new order data to the Order collection in the database
  addOrder: async (order) => {
    // create new Order data object
    const newOrder = new Order({
      id: order.id,
      description: order.description,
      price: order.price,
      status: order.status,
      size: order.size,
      dateRequested: order.dateRequested,
      dateShipped: order.dateShipped,
    });

    // add new order data to the Order collection
    return newOrder.save();
  },
};

// export order service object for order data creation and manipulation
export default OrderService;
