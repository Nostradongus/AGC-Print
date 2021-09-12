// get worker service static object from service folder
import WorkerService from '../service/worker_service.js';

import UserService from '../service/user_service.js';

import nodemailer from 'nodemailer';

import logger from '../logger/index.js';

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

  // worker controller method to send an email to inform the client about the project cost
  sendEmailProjectCost: async (req, res) => {
    try {
      // get the data of the client from the database
      const clientData = await UserService.getUser(req.body.username);
      // order set id of the placed order
      const payment = {
        downPayment: req.body.downPayment,
        totalCost: req.body.totalCost,
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
          '<p>Dear ' +
          clientData.name +
          ',</p>' +
          '<p>The total project cost and breakdown are now' +
          ' available for viewing via our order portal. You may ' +
          'check the details of your order via the My Orders Page. ' +
          'The total cost of the project is <b>' +
          payment.totalCost +
          '</b>. ' +
          'You may ' +
          ' pay the down payment of the project amounting to <b>' +
          payment.downPayment +
          '</b> via the following payment channels.</p>' +
          '<p>Please upload your payment slip or proof of payment via ' +
          'the payment page. You may access this by clicking your order ' +
          'and selecting the Pay Here option located at the bottom right ' +
          'of the page. </p>' +
          '<p>Thank you and have a great day! </p>' +
          '<p>AGC Print </p>' +
          '<p>[Please do not reply to this email. This is an auto-generated message]</p>',
      });
      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
      logger.info('Message sent: ' + emailFormat.messageId);

      return res
        .status(201)
        .json('Project Cost E-mail Sent To ' + clientData.email + '!');
    } catch (err) {
      res.status(500).json({ message: 'Server Error' });
    }
  },

  // worker controller method to send an email to inform the client that their order is being processed
  sendEmailProcessingOrder: async (req, res) => {
    try {
      // get the data of the client from the database
      const clientData = await UserService.getUser(req.body.username);
      // order set id of the placed order
      const payment = {
        downPayment: req.body.downPayment,
        channel: req.body.channel,
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
          '<p>Dear ' +
          clientData.name +
          ',</p>' +
          '<p>We have received your down payment amounting to <b>' +
          payment.downPayment +
          '</b> paid via <b>' +
          payment.channel +
          '</b>. Your order is now being processed and will be ready ' +
          'within 2-3 working days. You may check the status of your ' +
          'order via the My Orders page. </p>' +
          '<p>Thank you and have a great day! </p>' +
          '<p>AGC Print </p>' +
          '<p>[Please do not reply to this email. This is an auto-generated message]</p>',
      });
      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
      logger.info('Message sent: ' + emailFormat.messageId);

      return res
        .status(201)
        .json('Processing Order E-mail Sent To ' + clientData.email + '!');
    } catch (err) {
      res.status(500).json({ message: 'Server Error' });
    }
  },

  // worker controller method to send an email to inform the client that their order is complete
  sendEmailOrderComplete: async (req, res) => {
    try {
      // get the data of the client from the database
      const clientData = await UserService.getUser(req.body.username);
      // order set id of the placed order
      const payment = {
        rmBal: req.body.rmBal,
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
          '<p>Dear ' +
          clientData.name +
          ',</p>' +
          '<p>Your order has been completed. You may pay the remaining ' +
          'balance amounting to <b>' +
          payment.rmBal +
          '</b> via the following payment channels. ' +
          'Please upload the payment slip / proof of payment. You ' +
          'may access this by going to the My Order page and clicking ' +
          'on the pay here button located at the bottom of the page.</p>' +
          '<p>You may also schedule the product delivery via the My ' +
          'Orders page. Click the Schedule Delivery button and select ' +
          'a delivery date. The date is subject to approval by our staff.</p>' +
          '<p>Thank you and have a great day! </p>' +
          '<p>AGC Print </p>' +
          '<p>[Please do not reply to this email. This is an auto-generated message]</p>',
      });
      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
      logger.info('Message sent: ' + emailFormat.messageId);

      return res
        .status(201)
        .json('Order Complete E-mail Sent To ' + clientData.email + '!');
    } catch (err) {
      res.status(500).json({ message: 'Server Error' });
    }
  },
};

// export worker controller object for routing
export default workerController;
