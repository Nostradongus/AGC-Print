// get user service static object from service folder
import UserService from '../service/user_service.js';

// get worker service static object from service folder
import WorkerService from '../service/worker_service.js';

// import bcrypt module for password hashing
import bcrypt from 'bcrypt';
const saltRounds = 10;

// for jwtoken session management
import token from '../middleware/token.js';

// for server-side (backend) validation
import { validationResult } from 'express-validator';

// index controller object for index controller methods
const indexController = {
  // index controller method to logout user
  getLogout: (req, res) => {
    return res.status(204).json('LOGOUT');
  },

  // index controller method to login user or worker
  postLogin: async (req, res) => {
    // check if there are server-side (backend) validation errors
    const validationError = validationResult(req);

    // if validation errors occur
    if (!validationError.isEmpty()) {
      // return with bad request and error message
      return res
        .status(400)
        .json({ message: 'Incorrect username or password.' });
    } else {
      // temporary username and password values
      const username = req.body.username.toLowerCase();
      const password = req.body.password;

      // if user data exist in the database
      const user = await UserService.getUser({ username: username });
      const worker = await WorkerService.getWorker({ username: username });
      if (user != null) {
        // compare user's stored and hashed password with the inputted password
        bcrypt.compare(password, user.password, function (err, result) {
          // if inputted password matches the stored and hashed password
          if (result) {
            // generate access token with expected payload data for user authentication purposes
            const userPayload = {
              username: user.username,
              firstname: user.firstname,
              lastname: user.lastname,
              email: user.email,
            };
            const accessToken = token.generateAccessToken(userPayload);

            // return access token and needed user data
            return res.status(200).json({
              accessToken: accessToken,
              data: userPayload,
              message: 'Successfully Logged In!',
              flag: 0,
            });
          } else {
            // incorrect password was inputted
            return res.status(400).json({
              username: req.body.username,
              passwordError: 'Incorrect password!',
            });
          }
        });
      } else if (worker != null) {
        // compare worker's stored and hashed password with the inputted password
        bcrypt.compare(password, worker.password, function (err, result) {
          // if inputted password matches the stored and hashed password
          if (result) {
            // generate access token with expected payload data for user authentication purposes
            const workerPayload = {
              username: worker.username,
              firstname: worker.firstname,
              lastname: worker.lastname,
              email: worker.email,
              isSystemAdmin: worker.isSystemAdmin,
            };
            const accessToken = token.generateAccessToken(workerPayload);

            // return access token and needed worker data
            return res.status(200).json({
              accessToken: accessToken,
              data: workerPayload,
              message: 'Successfully Logged In!',
              flag: 1,
            });
          } else {
            // incorrect password was inputted
            return res.status(400).json({
              username: req.body.username,
              passwordError: 'Incorrect password!',
            });
          }
        });
      } else {
        // username does not exist in the database
        return res.status(400).json({ usernameError: 'User not found!' });
      }
    }
  },

  // index controller method to register (add) user to the database
  postRegister: async (req, res) => {
    // check if there are validation errors
    const validationError = validationResult(req);

    // if validation errors occur
    if (!validationError.isEmpty()) {
      // return with bad request and error message
      return res.status(400).json({ message: 'Incorrect inputs.' });
    } else {
      // check if username already exists in the database
      const userData = await UserService.getUser({
        username: req.body.username.toLowerCase(),
      });

      // check if email already exists in the database
      const emailData = await UserService.getUser({ email: req.body.email });

      // contact number and email format check
      const validContactNo = req.body.contactNo[0] + req.body.contactNo[1];
      const validEmailAt = req.body.email.split('@');
      const validEmailDot = req.body.email.split('.');

      // if user already exists in the database
      if (userData != null) {
        const details = {
          error: 'Username already exists',
          usernameError: true,
        };
        return res.status(400).json(details);
        // if email already exists
      } else if (emailData != null) {
        const details = {
          error: 'E-mail already exists',
          emailError: true,
        };
        return res.status(400).json(details);

        // email does not follow valid format
      } else if (validEmailAt.length < 2 || validEmailDot.length < 2) {
        const details = {
          error: 'Email does not follow valid format.',
          emailError: true,
        };
        return res.status(400).json(details);
      }
      // if contact number inputted does not match the valid format (starts with "63")
      else if (validContactNo !== '63') {
        const details = {
          error: 'Contact number must start with "63".',
          contactNoError: true,
        };
        return res.status(400).json(details);

        // if password and confirm password fields do not match each other
      } else if (req.body.password !== req.body.confirmPassword) {
        const details = {
          error:
            'Password and Confirm Password fields do not match each other.',
          passwordError: true,
        };
        return res.status(400).json(details);

        // add new user to database
      } else {
        // capitalize first letter of first name and last name
        const firstname =
          req.body.firstname.charAt(0).toUpperCase() +
          req.body.firstname.slice(1);
        const lastname =
          req.body.lastname.charAt(0).toUpperCase() +
          req.body.lastname.slice(1);

        // create new user object
        const user = {
          username: req.body.username.toLowerCase(),
          password: null,
          firstname: firstname,
          lastname: lastname,
          contactNo: req.body.contactNo,
          email: req.body.email,
        };

        // hash password
        user.password = await bcrypt.hash(req.body.password, saltRounds);

        // add user to database and get result back
        const result = await UserService.addUser(user);

        // return user data back as indicator of successful registration
        return res.status(201).json(result);
      }
    }
  },
};

// export index routes
export default indexController;
