// import express module for router
import express from 'express';

// import user controller object for user controller methods
import userController from '../controller/user_controller.js';

// import jwt token middleware for user authentication
import token from '../middleware/token.js';

// get express router
const router = express.Router();

// route for retrieving all user data from the database
router.get('/', token.authenticateToken, userController.getUsers);

// route for retrieving a specific user data from the database
router.get('/:username', token.authenticateToken, userController.getUser);

// export user routes
export default router;
