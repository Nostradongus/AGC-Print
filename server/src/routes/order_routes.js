// import express module for router
import express from 'express';

// import multer for upload configuration of order image files
import multer from 'multer';

// import order controller object for order controller methods
import orderController from '../controller/order_controller.js';

// import jwt token middleware for user authentication
import token from '../middleware/token.js';

// get express router
const router = express.Router();

// NOTE: USE IF UPLOADING IN LOCAL FOLDERS ONLY
// set up multer for uploading order images
// const orderImageStorage = multer.diskStorage({
//   // where the order files will be uploaded
//   destination: function (req, file, cb) {
//     // image extensions
//     const imgExtensions = ['png', 'jpg', 'jpeg', 'svg'];

//     // get uploaded file's extension (file type)
//     const filename = file.originalname;
//     const ext = filename.substring(filename.indexOf('.') + 1);

//     // if uploaded order file is a png, jpg, or svg file
//     if (imgExtensions.includes(ext)) {
//       // upload to order images subfolder
//       cb(null, './src/public/order_images');
//     } else {
//       // upload to order documents subfolder
//       cb(null, './src/public/order_docs');
//     }
//   },

//   // filename format for order file
//   filename: function (req, file, cb) {
//     cb(null, file.originalname);
//   },
// });
// const orderFileUpload = multer({ storage: orderImageStorage });

// NOTE: USE IF UPLOADING WITH CLOUDINARY
const orderFileUpload = multer({ storage: multer.diskStorage({}) });

// route for getting all orders from the database
router.get('/', token.authenticateToken, orderController.getAllOrderSets);

// route for getting all orders of a user from the database
router.get(
  '/:username',
  token.authenticateToken,
  orderController.getUserOrderSets
);

// route for user's orders according to filter option
router.get(
  '/:username/filter/:status',
  token.authenticateToken,
  orderController.getUserOrderSetsFiltered
);

// route for user's active orders
router.get(
  '/:username/user-active',
  token.authenticateToken,
  orderController.getUserActiveOrderSets
);

// route for all active orders of users
router.get(
  '/orders/users-active',
  token.authenticateToken,
  orderController.getAllActiveOrderSets
);

// route for all past orders of users
router.get(
  '/orders/users-past',
  token.authenticateToken,
  orderController.getAllPastOrderSets
);

// route for all orders according to filter option
router.get(
  '/orders/filter/:status',
  token.authenticateToken,
  orderController.getAllOrderSetsFiltered
);

// route for getting a specific order from the database
router.get('/details/:id', token.authenticateToken, orderController.getOrder);

// route for getting a specific order set from the database
router.get(
  '/details/orderSet/:id',
  token.authenticateToken,
  orderController.getOrderSet
);

// route for getting all orders of an order set from the database
router.get(
  '/orderSet/orders/:id',
  token.authenticateToken,
  orderController.getOrdersFromOrderSet
);

// route for adding new order to cart
router.post(
  '/cart/add',
  token.authenticateToken,
  orderFileUpload.single('order-file'),
  orderController.addToCart
);

// route for adding new order/s to the database after checkout
router.post(
  '/cart/confirm',
  token.authenticateToken,
  orderController.addOrderSet
);

// route for sending email to inform the client that their order is confirmed
router.post(
  '/cart/confirm/sendEmailOrderPlaced',
  token.authenticateToken,
  orderController.sendEmailOrderPlaced
);

// route for deleting an order from cart
router.delete(
  '/cart/delete/:filename',
  token.authenticateToken,
  orderController.deleteFromCart
);

// route for deleting an order from the database
router.delete(
  '/delete/:id',
  token.authenticateToken,
  orderController.deleteOrder
);

// route for deleting an order set from the database
router.delete(
  '/delete/orderSet/:id',
  token.authenticateToken,
  orderController.deleteOrderSet
);

// route for updating an order set from the database
router.patch(
  '/update/orderSet/:id',
  token.authenticateToken,
  orderController.updateOrderSet
);

// route for updating an order from the database
router.patch(
  '/update/order/:id',
  token.authenticateToken,
  orderController.updateOrder
);

// route for updating the reported indicator of an order set from the database
router.patch(
  '/update/orderSet/reported/:id',
  token.authenticateToken,
  orderController.updateOrderSetReported
);

// export order routes
export default router;
