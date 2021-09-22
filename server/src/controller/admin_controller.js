// get worker service static object from service folder
import WorkerService from '../service/worker_service.js';

// get admin service static object from service folder
import AdminService from '../service/admin_service.js';

// import bcrypt module for password hashing
import bcrypt from 'bcrypt';
const saltRounds = 10;

// for server-side (backend) validation
import { validationResult } from 'express-validator';

// admin controller object for admin controller methods
const adminController = {
  // admin controller method to register (add) worker to the database
  postRegisterWorker: async (req, res) => {
    // check if there are validation errors
    const validationError = validationResult(req);

    // if validation errors occur
    if (!validationError.isEmpty()) {
      // return with bad request and error message
      return res.status(400).json({ message: 'Incorrect inputs.' });
    } else {
      // check if username already exists in the database
      const workerData = await WorkerService.getWorker({
        username: req.body.username.toLowerCase(),
      });

      // check if email already exists in the database
      const emailData = await WorkerService.getWorker({
        email: req.body.email,
      });

      // contact number and email format check
      const validContactNo = req.body.contactNo[0] + req.body.contactNo[1];
      const validEmailAt = req.body.email.split('@');
      const validEmailDot = req.body.email.split('.');

      // if worker already exists in the database
      if (workerData != null) {
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

        // add new worker to database
      } else {
        // create new worker object
        const worker = {
          username: req.body.username.toLowerCase(),
          password: null,
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          contactNo: req.body.contactNo,
          email: req.body.email,
          isSystemAdmin: req.body.isSystemAdmin,
        };

        // hash password
        worker.password = await bcrypt.hash(req.body.password, saltRounds);

        // add worker to database and get result back
        const result = await WorkerService.addWorker(worker);

        // return worker data back as indicator of successful registration
        return res.status(201).json(result);
      }
    }
  },

  deleteWorker: async (req, res) => {
    try {
      // delete the worker from the database
      const result = await AdminService.deleteWorker({
        username: req.params.username,
      });

      // send worker data back to the admin to indicate success
      return res.status(202).json(result);
    } catch (err) {
      // if error has occurred, send server error status and message
      return res.status(500).json({ message: 'Server Error' });
    }
  },

  updateWorker: async (req, res) => {
    try {
      const username = req.params.username;

      // check if there are validation errors
      const validationError = validationResult(req);

      // if validation errors occur
      if (!validationError.isEmpty()) {
        // return with bad request and error message
        return res.status(400).json({ message: 'Incorrect inputs.' });
      } else {
        let emailData = null;
        if (req.body.email != req.body.initEmail && !req.body.email) {
          // check if email already exists in the database
          emailData = await WorkerService.getWorker({
            email: req.body.email,
          });
        }

        // contact number and email format check
        const validContactNo = req.body.contactNo[0] + req.body.contactNo[1];
        const validEmailAt = req.body.email.split('@');
        const validEmailDot = req.body.email.split('.');

        // if email already exists
        if (emailData != null) {
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
        } else if (
          req.body.password !== req.body.confirmPassword &&
          !req.body.password &&
          !req.body.confirmPassword
        ) {
          const details = {
            error:
              'Password and Confirm Password fields do not match each other.',
            passwordError: true,
          };
          return res.status(400).json(details);

          // add new worker to database
        } else {
          // create new worker object
          const worker = {
            username: req.body.username.toLowerCase(),
            password: null,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            contactNo: req.body.contactNo,
            email: req.body.email,
          };

          // hash password
          worker.password = await bcrypt.hash(req.body.password, saltRounds);

          // add worker to database and get result back
          const result = await AdminService.updateWorker(username, worker);

          // return worker data back as indicator of successful registration
          return res.status(201).json(result);
        }
      }
      return res.status(204).json(result);
    } catch (err) {
      console.log(err);
      // if error has occurred, send server error status and message
      return res.status(500).json({ message: 'Server Error' });
    }
  },
};

// export admin routes
export default adminController;
