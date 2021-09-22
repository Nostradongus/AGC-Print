// import express module for router
import express from 'express';

// get index controller object for index controller methods
import adminController from '../controller/admin_controller.js';

// import jwt token middleware for user authentication
import token from '../middleware/token.js';

// get validation middleware for server-side (backend) validation methods
import validator from '../middleware/validator.js';

// get express router
const router = express.Router();

// route for adding (registering) a new worker to the database
router.post(
  '/registerWorker',
  token.authenticateToken,
  validator.validateUserForm(),
  adminController.postRegisterWorker
);

// route for deleting a worker from the database
router.delete(
  '/deleteWorker/:username',
  token.authenticateToken,
  adminController.deleteWorker
);

// route for updating a worker from the database
router.patch(
  '/updateWorker/:username',
  token.authenticateToken,
  validator.validateWorkerProfileUpdate(),
  adminController.updateWorker
);

// export index routes
export default router;
