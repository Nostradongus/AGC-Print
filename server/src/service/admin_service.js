// get Worker model in models folder
import Worker from '../model/Worker.js';

// create service object that contains methods for admin
const AdminService = {
  // this method deletes a worker from the database
  deleteWorker: async (username) => Worker.deleteOne(username),
  // this method updates a worker's data in the database
  updateWorker: async (username, staffData) =>
    Worker.findOneAndUpdate(
      { username: username },
      { $set: staffData },
      { new: true, omitUndefined: true }
    ),
};

export default AdminService;
