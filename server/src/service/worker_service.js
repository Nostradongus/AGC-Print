// get Worker model in models folder
import Worker from '../model/Worker.js';

// create service object that contains methods for worker account data manipulation
const WorkerService = {
  // this method retrieves and returns all worker account data in the database
  getWorkers: async () =>
    Worker.find({ isSystemAdmin: 0 }).sort({
      firstname: 1,
      lastname: 1,
      username: 1,
    }),
  // this method retrieves and returns a specific worker account data based on given data
  getWorker: async (data) => Worker.findOne(data),
  // this method adds a new worker account data to the Worker collection in the database
  addWorker: async (worker) => {
    // create new Worker data object
    const newWorker = new Worker({
      username: worker.username,
      password: worker.password,
      firstname: worker.firstname,
      lastname: worker.lastname,
      email: worker.email,
      contactNo: worker.contactNo,
      isSystemAdmin: worker.isSystemAdmin,
    });

    // add new worker account data to the Worker collection
    return newWorker.save();
  },
};

// export worker service object for worker account data creation and manipulation
export default WorkerService;
