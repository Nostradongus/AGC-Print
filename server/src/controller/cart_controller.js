// get cart model object from model folder
import Cart from '../model/Cart.js';

// cart controller object for cart controller methods
const cartController = {
  // cart controller method to add an order to the cart in session
  addToCart: (req, res) => {
    // create new cart object with session cart
    const cart = new Cart(req.session.cart ? req.session.cart : {});

    const orderData = {
      order: req.body,
      user: req.user,
      image: req.file,
    };
    const id = cart.addOrder(orderData);
    req.session.cart = cart;
    console.log(req.session);

    req.session.save();

    // console.log(req.session.cart);
    // return the array of orders created by the user back to the client
    return res.status(201).json({ id: id });
  },

  // cart controller method to delete orders from cart
  deleteFromCart: (req, res) => {
    // get passed order id
    const id = req.params.id; // unique id of order

    // create new cart object with session cart
    const cart = new Cart(req.session.cart ? req.session.cart : {});

    // delete specified order from the cart
    cart.deleteOrder(id);

    // assign updated cart to session cart
    req.session.cart = cart;

    req.session.save();

    // return the array of orders created by the user back to the client
    return res.status(202).json(cart.generateArr());
  },

  // cart controller method to update an order from cart (Delivery Information)
  updateOrderFromCart: (req, res) => {
    // get passed order id
    const id = req.params.id; // unique id of order

    // create new cart object with session cart
    const cart = new Cart(req.session.cart ? req.session.cart : {});

    // update specified order from cart with given delivery information
    cart.updateOrder(id, req.body);

    // assign updated cart to session cart
    req.session.cart = cart;

    req.session.save();

    // return the order's id
    return res.status(202).json({ id: id });
  },
};

// export cart controller object
export default cartController;
