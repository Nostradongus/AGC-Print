// get worker service static object from service folder
import WorkerService from '../service/worker_service.js';

const workerController = {
  /**
   * worker controller method to retrieve and return all workers from the database
   * @param {*} req object containing information regarding the HTTP request
   * @param {*} res the response configured and sent back to the client
   * @return {*} if request is successful, sends an array of worker document objects from the Worker collection
   *             else, returns an error status and message indicating that the request is not successful
   */
  getWorkers: async (req, res) => {
    try {
      // retrieve all workers from the database
      const workers = await WorkerService.getWorkers();
      // send the array of workers back to the client
      res.send(workers);
    } catch (err) {
      // if error has occurred, send server error status and message
      res.status(500).json({ message: 'Server Error' });
    }
  },

  /**
   * worker controller method to retrieve and return a specific worker from the database
   * @param {*} req object containing information regarding the HTTP request
   * @param {*} res the response configured and sent back to the client
   * @return {*} if request is successful, sends the requested worker document object from the Worker collection
   *             else, returns an error status and message indicating that the request is not successful
   */
  getWorker: async (req, res) => {
    try {
      // retrieve a specific worker from the database given the username data from the request
      const worker = await WorkerService.getWorker(req.params.username);
      // if worker exists in the database, send the data back to the client
      if (worker != null) {
        return res.send(worker);
      }
      // if worker does not exist, send error status and message
      res.status(404).json({ message: 'User not found!' });
    } catch (err) {
      // if error has occurred, send server error status and message
      res.status(500).json({ message: 'Server Error' });
    }
  },

  /**
   * worker controller method to add a new user to the database
   * @param {*} req object containing information regarding the HTTP request
   * @param {*} res the response configured and sent back to the client
   * @return {*} if request is successful, sends the created worker back to the client
   *             else, returns an error status and message indicating that the request is not successful
   */
  addWorker: async (req, res) => {
    try {
      // add new worker to the database with the request data given
      const worker = await WorkerService.addWorker(req.body);
      // send worker data back to the client to indicate success
      res.send(worker);
    } catch (err) {
      // if error has occurred, send server error status and message
      res.status(500).json({ message: 'Server Error' });
    }
  },
};

// export worker controller object for routing
export default workerController;
