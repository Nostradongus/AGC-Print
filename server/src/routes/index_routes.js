// import express module for router
import express from 'express';

// get index controller object for index controller methods
import indexController from '../controller/index_controller.js';

// get express router
const router = express.Router();

// route for logging out user from application
router.get('/logout', indexController.getLogout);

// route for logging in user to application
router.post('/login', indexController.postLogin);

// route for adding (registering) a new user to the database
router.post('/register', indexController.postRegister);

// export index routes
export default router;
