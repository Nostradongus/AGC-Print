// import express module for router
import express from 'express';

// get index controller object for index controller methods
import indexController from '../controller/index_controller.js';

// get express router
const router = express.Router();

// route for login page (start of application)
router.get('/', indexController.getLogin);

// route for home page (logged in)
router.get('/home', indexController.getHome);

// route for logging in user to application
router.get('/login', indexController.postLogin);

// route for logging out user from application
router.get('/logout', indexController.getLogout);

// route for register page
router.get('/register', indexController.getRegister);

// route for adding (registering) a new user to the database
router.post('/register', indexController.postRegister);

// export index routes
export default router;
