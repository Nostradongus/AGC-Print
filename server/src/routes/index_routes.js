// import express module for router
import express from 'express';

// get index controller object for index controller methods
import indexController from '../controller/index_controller.js';

// get express router
const router = express.Router();

// route for home server page
router.get('/', indexController.getHome);

// export index routes
export default router;
