// import express module for router
import express from 'express';

// import multer for upload configuration of order image files
import multer from 'multer';

// import order controller object for order controller methods
import orderController from '../controller/order_controller.js';

// import cart controller object for cart controller methods
import cartController from '../controller/cart_controller.js';

// import jwt token middleware for user authentication
import token from '../middleware/token.js';

// get express router
const router = express.Router();

// set up multer for uploading order images
const orderImageStorage = multer.diskStorage({
  // where the order image files will be uploaded
  destination: function (req, file, cb) {
    cb(null, './public/order_images');
  },

  // filename format for order images
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const orderImageUpload = multer({ storage: orderImageStorage });

// route for getting all orders from the database
router.get('/', token.authenticateToken, orderController.getAllOrders);

// route for getting all orders of a user from the database
router.get(
  '/:username',
  token.authenticateToken,
  orderController.getUserOrders
);

// route for getting a specific order from the database
router.get('/details/:id', token.authenticateToken, orderController.getOrder);

// route for deleting an order from cart
router.get(
  '/cart/delete/:id',
  token.authenticateToken,
  cartController.deleteFromCart
);

// route for checkout orders
router.get(
  '/cart/checkout',
  token.authenticateToken,
  orderController.checkoutOrders
);

// TODO: optimize past orders and current orders route to one route (merge)
// route for user's past orders
router.get(
  '/:username/pastOrders',
  token.authenticateToken,
  orderController.getUserPastOrders
);

// route for user's current orders
router.get(
  '/:username/currentOrders',
  token.authenticateToken,
  orderController.getUserCurrentOrders
);

router.get(
  '/:username/activeOrders',
  token.authenticateToken,
  orderController.getAllActiveOrders
);

// route for adding new order to cart
router.post(
  '/cart/add',
  token.authenticateToken,
  // TODO: to be updated soon, in front-end phase
  // orderImageUpload.single('order-image'), // upload order image
  cartController.addToCart
);

// route for adding new order/s to the database after checkout
router.post(
  '/cart/confirm',
  token.authenticateToken,
  orderController.addOrders
);

// export order routes
export default router;
