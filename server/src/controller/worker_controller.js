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
      const clientData = {
        name: req.body.name,
        email: req.body.email,
        status: req.body.status,
      };
      // create reusable transporter object using the default SMTP transport
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          // e-mail address of company 'bot'
          user: 'sweng.nodemailer@gmail.com',
          // password for the e-mail account
          pass: '1234567890Test',
        },
      });

      // send mail with defined transport object
      const emailFormat = await transporter.sendMail({
        // sender's e-mail address
        from: 'sweng.nodemailer@gmail.com',
        // receiver's e-mail address
        to: clientData.email,
        // subject of the e-mail
        subject: 'Automated Email Test',
        // content of the e-mail
        html:
          '<p>**THIS IS AN AUTOMATICALLY GENERATED EMAIL! PLEASE DO NOT REPLY!**<br><br>' +
          'Hello ' +
          clientData.name +
          '!<br><br>' +
          'The status of your order is now: ' +
          '<b>' +
          clientData.status +
          '</b></p>',
      });

      console.log('Message sent: %s', emailFormat.messageId);

      return res.status(201).json('E-mail Sent!');
      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
    } catch (err) {
      res.status(500).json({ message: 'Server Error' });
    }
  },
};

// export worker controller object for routing
export default workerController;
