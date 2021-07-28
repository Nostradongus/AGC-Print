// import express module for router
import express from 'express';

// import order controller object for order controller methods
import orderController from '../controller/order_controller.js';

// get express router
const router = express.Router();

// route for getting all orders from the database
router.get('/', orderController.getAllOrders);

// route for getting all orders of a user from the database
router.get('/:username', orderController.getUserOrders);

// route for getting a specific order from the database
router.get('/:id', orderController.getOrder);

// route for adding a new order to the database
router.post('/add-order', orderController.addOrder);

// export order routes
export default router;
