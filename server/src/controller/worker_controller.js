// get worker service static object from service folder
import WorkerService from '../service/worker_service.js';

const workerController = {
  // worker controller method to retrieve and return all workers from the database
  getWorkers: async (req, res) => {
    try {
      // retrieve all workers from the database
      const workers = await WorkerService.getWorkers();

      // if there are workers (staff) from the database
      if (workers.length != 0) {
        // send back array of workers to client
        return res.status(200).json(workers);
      }

      // send back empty array with appropriate status code
      return res.status(404).json(workers);
    } catch (err) {
      // if error has occurred, send server error status and message
      res.status(500).json({ message: 'Server Error' });
    }
  },

  // worker controller method to retrieve and return a specific worker from the database
  getWorker: async (req, res) => {
    try {
      // retrieve a specific worker from the database given the username data from the request
      const worker = await WorkerService.getWorker({
        username: req.params.username,
      });
      // if worker exists in the database, send the data back to the client
      if (worker != null) {
        return res.status(200).json(worker);
      }
      // if worker does not exist, send error status and message
      res.status(404).json({ message: 'Worker not found!' });
    } catch (err) {
      // if error has occurred, send server error status and message
      res.status(500).json({ message: 'Server Error' });
    }
  },

  // worker controller method to add a new user to the database
  addWorker: async (req, res) => {
    try {
      // add new worker to the database with the request data given
      const worker = await WorkerService.addWorker(req.body);
      // send worker data back to the client to indicate success
      return res.status(201).json(worker);
    } catch (err) {
      // if error has occurred, send server error status and message
      res.status(500).json({ message: 'Server Error' });
    }
  },
};

// export worker controller object for routing
export default workerController;
