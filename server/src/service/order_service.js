// get Order model in models folder
import Order from '../model/Order.js';
import OrderSet from '../model/OrderSet.js';

// create service object that contains methods for order data manipulation
const OrderService = {
  // this method retrieves and returns all order data in the database
  // from most recent to least recent
  getAllOrderSets: async () =>
    OrderSet.find({}).sort({ createdAt: 'descending' }),

  // this method returns all orders of users for the worker to view according to filter option
  // from most recent to least recent
  getAllOrderSetsFiltered: async (status) =>
    OrderSet.find({ status: status }).sort({ createdAt: 'descending' }),

  // this method retrieves and returns all orders of a specific user
  // from most recent to least recent
  getUserOrderSets: async (username) =>
    OrderSet.find({ user: username }).sort({
      createdAt: 'descending',
    }),

  // this method returns all orders of a specific user according to filter option
  // from most recent to least recent
  getUserOrderSetsFiltered: async (username, status) =>
    OrderSet.find({ user: username, status: status }).sort({
      createdAt: 'descending',
    }),

  // this method returns all active orders of users for the worker to process
  // from most recent to least recent
  getAllActiveOrderSets: async () =>
    OrderSet.find({
      status: {
        $in: [
          'Pending',
          'Waiting for Downpayment',
          'Processing',
          'Ready for Delivery',
        ],
      },
    }).sort({ createdAt: 'descending' }),

  // this method returns all past orders of users for the worker to process
  // from most recent to least recent
  getAllPastOrderSets: async () =>
    OrderSet.find({
      status: {
        $in: ['Completed', 'Cancelled'],
      },
    }).sort({ createdAt: 'descending' }),

  // this method returns all active orders of the users
  // from most recent to least recent
  getUserActiveOrderSets: async (username) =>
    OrderSet.find({
      user: username,
      status: {
        $in: [
          'Pending',
          'Waiting for Downpayment',
          'Processing',
          'Ready for Delivery',
        ],
      },
    }).sort({ createdAt: 'descending' }),

  // this method retrieves and returns a specific order set data based on given order set id
  getOrderSet: async (id) => OrderSet.findOne(id),

  // this method retrieves and returns all orders from an order set given the order set id
  getOrdersFromOrderSet: async (id) => Order.find({ orderSetId: id }),

  // this method retrieves and returns a specific order data based on given order id
  getOrder: async (id) => Order.findOne(id),

  // this method adds a new order data to the Order collection in the database
  addOrderSet: async (orderSet, orders) => {
    // get the orders from the order set and insert all of them to the database
    Order.insertMany(orders);

    // insert order set to the database
    OrderSet.create(orderSet);

    // return back array of orders to the client
    return orderSet;
  },

  // this method deletes an existing order from the database
  deleteOrder: async (id) => Order.deleteOne(id),

  // NOTE: used inside deleteOrderSet method
  // this method deletes a set of orders from the database
  deleteOrders: async (id) => Order.deleteMany(id),

  // this method deletes an order set from the database
  deleteOrderSet: async (id) => OrderSet.deleteOne(id),

  // this method updates an order set from the database
  updateOrderSet: async (id, data) =>
    OrderSet.findOneAndUpdate(
      { id: id },
      { $set: data },
      { new: true, omitUndefined: true }
    ),

  // this method updates an order set's status from the database
  updateOrderSetStatus: async (data) =>
    OrderSet.updateOne({ id: data.id }, { status: data.status }),

  // this method updates an order set's price from the database
  updateOrderSetPrice: async (data) =>
    OrderSet.updateOne({ id: data.id }, { price: data.price }),

  // this method updates that an order set has been reported, from the database
  updateOrderSetReported: async (data) =>
    OrderSet.updateOne({ id: data.id }, { reported: data.reported }),

  // this method updates an order's status from the database
  updateOrderStatus: async (data) =>
    Order.updateOne({ id: data.id }, { status: data.status }),

  // this method updates an order's price from the database
  updateOrderPrice: async (data) =>
    Order.updateOne({ id: data.id }, { price: data.price }),
};

// export order service object for order data creation and manipulation
export default OrderService;
