// get worker service static object from service folder
import WorkerService from '../service/worker_service.js';

import nodemailer from 'nodemailer';

const workerController = {
  // worker controller method to retrieve and return all workers from the database
  getWorkers: async (req, res) => {
    try {
      // retrieve all workers from the database
      const workers = await WorkerService.getWorkers();
      // send the array of workers back to the client
      return res.status(200).json(workers);
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

  // worker controller method to send an email to users about updated status of their orders
  sendUpdate: async (req, res) => {
    try {
      // create reusable transporter object using the default SMTP transport
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'sweng.nodemailer@gmail.com', // generated ethereal user
          pass: '1234567890Test', // generated ethereal password
        },
      });

      // send mail with defined transport object
      const info = await transporter.sendMail({
        from: 'sweng.nodemailer@gmail.com', // sender address
        to: 'luffytar7@gmail.com', // list of receivers
        subject: 'Automated Email Test 1', // Subject line
        text: 'Hello', // plain text body
      });

      console.log('Message sent: %s', info.messageId);
      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
    } catch (err) {
      res.status(500).json({ message: 'Server Error' });
    }
  },
};

// export worker controller object for routing
export default workerController;
