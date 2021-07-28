// get user service static object from service folder
import UserService from '../service/user_service.js';

// user controller object containing all user controller methods
const userController = {
  // user controller method to retrieve and return all users from the database
  getUsers: async (req, res) => {
    try {
      // retrieve all users from the database
      const users = await UserService.getUsers();
      // send the array of users back to the client
      return res.json(users);
    } catch (err) {
      // if error has occurred, send server error status and message
      res.status(500).json({ message: 'Server Error' });
    }
  },

  // user controller method to retrieve and return a specific user from the database
  getUser: async (req, res) => {
    try {
      // retrieve a specific user from the database given the username data from the request
      const user = await UserService.getUser({ username: req.params.username });

      // if user exists in the database, send the data back to the client
      if (user != null) {
        return res.json(user);
      }

      // if user does not exist, send error status and message
      return res.json({ message: 'User not found!' });
    } catch (err) {
      // if error has occurred, send server error status and message
      res.status(500).json({ message: 'Server Error' });
    }
  },

  // user controller method to add a new user to the database
  addUser: async (req, res) => {
    try {
      // add new user to the database with the request data given
      const user = await UserService.addUser(req.body);
      // send user data back to the client to indicate success
      return res.json(user);
    } catch (err) {
      // if error has occurred, send server error status and message
      res.status(500).json({ message: 'Server Error' });
    }
  },
};

// export user controller object for routing
export default userController;
