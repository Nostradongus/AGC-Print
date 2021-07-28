// import express module for router
import express from 'express';

// import worker controller object for worker controller methods
import workerController from '../controller/worker_controller.js';

// get express router
const router = express.Router();

// route for retrieving all worker data from the database
router.get('/', workerController.getWorkers);

// route for retrieving a specific worker data from the database
router.get('/:username', workerController.getWorker);

// route for adding a new worker to the database
router.post('/register', workerController.addWorker);

// export worker routes
export default router;
