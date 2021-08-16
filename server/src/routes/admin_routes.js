// import express module for router
import express from 'express';

// get index controller object for index controller methods
import adminController from '../controller/admin_controller.js';

// get validation middleware for server-side (backend) validation methods
import validator from '../middleware/validator.js';

// get express router
const router = express.Router();

// route for adding (registering) a new worker to the database
router.post(
  '/registerWorker',
  validator.validateUserForm(),
  adminController.postRegisterWorker
);

// export index routes
export default router;
