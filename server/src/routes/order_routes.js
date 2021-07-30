// import express module for router
import express from 'express';

// import multer for upload configuration of order image files
import multer from 'multer';

// import order controller object for order controller methods
import orderController from '../controller/order_controller.js';

// import cart controller object for cart controller methods
import cartController from '../controller/cart_controller.js';

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
router.get('/', orderController.getAllOrders);

// route for getting all orders of a user from the database
router.get('/:username', orderController.getUserOrders);

// route for getting a specific order from the database
router.get('/details/:id', orderController.getOrder);

// route for deleting an order from cart
router.get('/delete-from-cart/:id', cartController.deleteFromCart);

// route for checkout orders
router.get('/checkout', orderController.checkoutOrders);

// route for adding new order to cart
router.post(
  '/add-to-cart',
  orderImageUpload.single('order-image'), // upload order image
  cartController.addToCart
);

// route for adding new order/s to the database after checkout
router.post('/add-orders', orderController.addOrders);

// export order routes
export default router;
