// import express module for router
import express from 'express';

// import worker controller object for worker controller methods
import workerController from '../controller/worker_controller.js';

// import jwt token middle for user authentication
import token from '../middleware/token.js';

// get express router
const router = express.Router();

// route for retrieving all worker data from the database
router.get('/', token.authenticateToken, workerController.getWorkers);

// route for retrieving a specific worker data from the database
router.get('/:username', token.authenticateToken, workerController.getWorker);

// route for adding a new worker to the database
router.post('/add-worker', token.authenticateToken, workerController.addWorker);

router.post('/sendUpdate', workerController.sendUpdate);

// export worker routes
export default router;
