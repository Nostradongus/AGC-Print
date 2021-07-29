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
  addOrder: async (order) => {
    // get today's date
    const date = new Date();
    const formattedDate = `${date.getFullYear().toString()} - 
                           ${(date.getMonth() + 1).toString().padStart(2, 0)} -
                           ${date.getDate().toString().padStart(2, 0)}`;
    // create new Order data object
    const newOrder = new Order({
      id: order.id,
      type: order.type,
      quantity: order.quantity,
      size: order.size,
      frameEdges: order.frameEdges,
      frameFinishing: order.frameFinishing,
      name: order.name,
      email: order.email,
      address: order.address,
      contactNo: order.contactNo,
      payMethod: order.payMethod,
      dateRequested: formattedDate,
    });

    // add new order data to the Order collection
    return newOrder.save();
  },
};

// export order service object for order data creation and manipulation
export default OrderService;
