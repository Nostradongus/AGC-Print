// get user service static object from service folder
import logger from '../logger/index.js';
import UserService from '../service/user_service.js';

// user controller object containing all user controller methods
const userController = {
  // user controller method to retrieve and return all users from the database
  getUsers: async (req, res) => {
    try {
      // retrieve all users from the database
      const users = await UserService.getUsers();
      // send the array of users back to the client
      return res.status(200).json(users);
    } catch (err) {
      // if error has occurred, send server error status and message
      logger.info(err);
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
        return res.status(200).json(user);
      }

      // if user does not exist, send error status and message
      return res.status(404).json({ message: 'User not found!' });
    } catch (err) {
      // if error has occurred, send server error status and message
      logger.info(err);
      res.status(500).json({ message: 'Server Error' });
    }
  },

  // user controller method to add a new user to the database
  addUser: async (req, res) => {
    try {
      // add new user to the database with the request data given
      const user = await UserService.addUser(req.body);
      // send user data back to the client to indicate success
      return res.status(201).json(user);
    } catch (err) {
      // if error has occurred, send server error status and message
      logger.info(err);
      res.status(500).json({ message: 'Server Error' });
    }
  },

  updateUser: async (req, res) => {
    try {
      await UserService.updateUser(req);
      // Note status 204 does not return any response body
      return res.status(204).send();
    } catch (err) {
      logger.info(err);
      res.status(404).json({ message: 'User not found!' });
    }
  },
};

// export user controller object for routing
export default userController;
