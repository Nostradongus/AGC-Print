import nodemailer from 'nodemailer';

import logger from '../logger/index.js';

const sendEmail = {
  // email controller methods to be sent to the client
  // email controller method to send an email to inform the client that their order is placed
  sendEmailOrderPlaced: async (req, res) => {
    try {
      // get the data of the client
      const clientData = {
        name: req.body.name,
        email: req.body.email,
        orderId: req.body.id,
      };

      // create reusable transporter object using the default SMTP transport
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          // e-mail address of company 'bot'
          user: 'web.agcprint@gmail.com',
          // password for the e-mail account
          pass: 'Agc1984print',
        },
      });

      // send mail with defined transport object
      const emailFormat = await transporter.sendMail({
        // sender's e-mail address
        from: '"AGC Print" <web.agcprint@gmail.com>',
        // receiver's e-mail address
        to: clientData.email,
        // subject of the e-mail
        subject: '[Order # ' + clientData.orderId + '] Order Confirmed',
        // content of the e-mail
        html:
          '<p>Dear ' +
          clientData.name +
          ',</p>' +
          '<p>Thank you for ordering with us. Your order with reference number <b>' +
          clientData.orderId +
          '</b> has been received by our staff and ' +
          'is currently being processed. The total project cost will ' +
          'be available within 24 hours. You may view the project cost at ' +
          'https://agcprint.netlify.app/orders.</p>' +
          '<p>Thank you and have a great day! </p>' +
          '<p>AGC Print </p>' +
          '<p>[Please do not reply to this email. This is an auto-generated message]</p>',
      });
      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
      logger.info('Message sent: ' + emailFormat.messageId);

      return res.status(201).json({
        message: 'E-mail successfully sent!',
      });
    } catch (err) {
      logger.info(err);
      return res.status(500).json({ message: 'Server Error' });
    }
  },

  // email controller method to send an email to inform the client about the project cost
  sendEmailProjectCost: async (req, res) => {
    try {
      // get the data of the client
      const clientData = {
        name: req.body.name,
        email: req.body.email,
        orderId: req.body.id,
      };
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
          user: 'web.agcprint@gmail.com',
          // password for the e-mail account
          pass: 'Agc1984print',
        },
      });

      // send mail with defined transport object
      const emailFormat = await transporter.sendMail({
        // sender's e-mail address
        from: '"AGC Print" <web.agcprint@gmail.com>',
        // receiver's e-mail address
        to: clientData.email,
        // subject of the e-mail
        subject: '[Order # ' + clientData.orderId + '] Total Cost of Order',
        // content of the e-mail
        html:
          '<p>Dear ' +
          clientData.name +
          ',</p>' +
          '<p>The total project cost and breakdown are now' +
          ' available for viewing via our order portal. You may ' +
          'check the details of your order via the My Orders Page. ' +
          'The total cost of the project is <b>₱' +
          payment.totalCost +
          '</b>. ' +
          'You may ' +
          ' pay the down payment of the project amounting to <b>₱' +
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

      return res.status(201).json({
        message: 'E-mail successfully sent!',
      });
    } catch (err) {
      return res.status(500).json({ message: 'Server Error' });
    }
  },

  // email controller method to send an email to inform the client that their order is being processed
  sendEmailProcessingOrder: async (req, res) => {
    try {
      // get the data of the client
      const clientData = {
        name: req.body.name,
        email: req.body.email,
        orderId: req.body.id,
      };
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
          user: 'web.agcprint@gmail.com',
          // password for the e-mail account
          pass: 'Agc1984print',
        },
      });

      // send mail with defined transport object
      const emailFormat = await transporter.sendMail({
        // sender's e-mail address
        from: '"AGC Print" <web.agcprint@gmail.com>',
        // receiver's e-mail address
        to: clientData.email,
        // subject of the e-mail
        subject: '[Order # ' + clientData.orderId + '] Processing Order',
        // content of the e-mail
        html:
          '<p>Dear ' +
          clientData.name +
          ',</p>' +
          '<p>We have received your down payment amounting to <b>₱' +
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

      return res.status(201).json({
        message: 'E-mail successfully sent!',
      });
    } catch (err) {
      return res.status(500).json({ message: 'Server Error' });
    }
  },

  // email controller method to send an email to inform the client that their order is complete
  sendEmailOrderComplete: async (req, res) => {
    try {
      // get the data of the client
      const clientData = {
        name: req.body.name,
        email: req.body.email,
        orderId: req.body.id,
      };

      // create reusable transporter object using the default SMTP transport
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          // e-mail address of company 'bot'
          user: 'web.agcprint@gmail.com',
          // password for the e-mail account
          pass: 'Agc1984print',
        },
      });

      // send mail with defined transport object
      const emailFormat = await transporter.sendMail({
        // sender's e-mail address
        from: '"AGC Print" <web.agcprint@gmail.com>',
        // receiver's e-mail address
        to: clientData.email,
        // subject of the e-mail
        subject: '[Order # ' + clientData.orderId + '] Order Completed',
        // content of the e-mail
        html:
          '<p>Dear ' +
          clientData.name +
          ',</p>' +
          '<p>Your order has been completed. If there is remaining balance unpaid ' +
          'in this order, please pay it via the payment channels as seen in the payment portal page. ' +
          'Upload the payment slip / proof of payment afterwards, you ' +
          'may access this by going to the details page of the order and clicking ' +
          'on the pay here button located at the bottom right of the page.</p>' +
          '<p>If there are issues or defects regarding the order, you may report these through the details page of the order. ' +
          'Click the Report Order button at the bottom right of the page and fill up the required fields regarding the issue. ' +
          'The report will be processed as soon as possible by our staff.</p>' +
          '<p>Thank you and have a great day! </p>' +
          '<p>AGC Print </p>' +
          '<p>[Please do not reply to this email. This is an auto-generated message]</p>',
      });
      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
      logger.info('Message sent: ' + emailFormat.messageId);

      return res.status(201).json({
        message: 'E-mail successfully sent!',
      });
    } catch (err) {
      return res.status(500).json({ message: 'Server Error' });
    }
  },

  // email controller method to send an email to the client for a submitted report
  sendEmailReport: async (req, res) => {
    try {
      // get the data of the client
      const clientData = {
        name: req.body.name,
        email: req.body.email,
        orderId: req.body.id,
      };

      // create reusable transporter object using the default SMTP transport
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          // e-mail address of company 'bot'
          user: 'web.agcprint@gmail.com',
          // password for the e-mail account
          pass: 'Agc1984print',
        },
      });

      // send mail with defined transport object
      const emailFormat = await transporter.sendMail({
        // sender's e-mail address
        from: '"AGC Print" <web.agcprint@gmail.com>',
        // receiver's e-mail address
        to: clientData.email,
        // subject of the e-mail
        subject: '[Order # ' + clientData.orderId + '] Order Reported',
        // content of the e-mail
        html:
          '<p>Dear ' +
          clientData.name +
          ',</p>' +
          '<p>We have received your report for order #<b>' +
          clientData.orderId +
          '</b>.We apologize for the inconvenience this may have caused.' +
          'We will get back to you within 24-48 hours via phone or email.</p>' +
          '<p>Thank you and have a great day! </p>' +
          '<p>AGC Print </p>' +
          '<p>[Please do not reply to this email. This is an auto-generated message]</p>',
      });
      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
      logger.info('Message sent: ' + emailFormat.messageId);

      return res.status(201).json({
        message: 'E-mail successfully sent!',
      });
    } catch (err) {
      logger.info(err);
      return res.status(500).json({ message: 'Server Error' });
    }
  },
  // email controller methods to be sent to the staff
  // email controller method to send an email to inform the staff that a new order has been placed
  // used in DeliveryInformation.vue
  sendEmailNewOrder: async (req, res) => {
    try {
      // get the data of the client
      const clientData = {
        orderId: req.body.id,
        name: req.body.name,
        contactNo: req.body.contactNo,
        address: req.body.address,
      };

      // create reusable transporter object using the default SMTP transport
      // e-mail account that will send the email
      // create reusable transporter object using the default SMTP transport
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          // e-mail address of company 'bot'
          user: 'web.agcprint@gmail.com',
          // password for the e-mail account
          pass: 'Agc1984print',
        },
      });

      // send mail with defined transport object
      const emailFormat = await transporter.sendMail({
        // sender's e-mail address
        from: '"AGC Print" <web.agcprint@gmail.com>',
        // receiver's e-mail address
        to: 'web.agcprint@gmail.com',
        // subject of the e-mail
        subject: '[Order # ' + clientData.orderId + '] New Client Order',
        // content of the e-mail
        html:
          '<p>Dear Staff,</p>' +
          '<p>A new order has been submitted with the following details:</p>' +
          '<p><b>Order #</b>: ' +
          clientData.orderId +
          '</p>' +
          '<p><b>Name of Client</b>: ' +
          clientData.name +
          '</p>' +
          '<p><b>Contact Number</b>: ' +
          clientData.contactNo +
          '</p>' +
          '<p><b>Delivery Address</b>: ' +
          clientData.address +
          '</p>' +
          '<p>Thank you and have a great day! </p>' +
          '<p>[Please do not reply to this email. This is an auto-generated message]</p>',
      });
      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
      logger.info('Message sent: ' + emailFormat.messageId);

      return res.status(201).json({
        message: 'E-mail successfully sent!',
      });
    } catch (err) {
      logger.info(err);
      return res.status(500).json({ message: 'Server Error' });
    }
  },
  // email controller method to send an email to inform the staff that a new payment has been made
  // used in Payment.vue
  sendEmailNewPayment: async (req, res) => {
    try {
      // get the data of the client
      const clientData = {
        orderId: req.body.id,
      };

      // create reusable transporter object using the default SMTP transport
      // e-mail account that will send the email
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          // e-mail address of company 'bot'
          user: 'web.agcprint@gmail.com',
          // password for the e-mail account
          pass: 'Agc1984print',
        },
      });

      // send mail with defined transport object
      const emailFormat = await transporter.sendMail({
        // sender's e-mail address
        from: '"AGC Print" <web.agcprint@gmail.com>',
        // receiver's e-mail address
        to: 'web.agcprint@gmail.com',
        // subject of the e-mail
        subject: '[Order # ' + clientData.orderId + '] New Client Payment',
        // content of the e-mail
        html:
          '<p>Dear Staff,</p>' +
          '<p>A new payment has been made for the order # <b> ' +
          clientData.orderId +
          '</b></p>' +
          '<p>You may view the payment receipt via the order management portal.</p>' +
          '<p>Thank you and have a great day! </p>' +
          '<p>[Please do not reply to this email. This is an auto-generated message]</p>',
      });
      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
      logger.info('Message sent: ' + emailFormat.messageId);

      return res.status(201).json({
        message: 'E-mail successfully sent!',
      });
    } catch (err) {
      logger.info(err);
      return res.status(500).json({ message: 'Server Error' });
    }
  },
  // email controller method to send an email to inform the staff that a new delivery schedule has been set
  // used in DeliverySchedule.vue
  sendEmailNewDelivery: async (req, res) => {
    try {
      // get the data of the client
      const clientData = {
        orderId: req.body.id,
        date: req.body.date,
        time: req.body.time,
        details: req.body.details,
      };

      // create reusable transporter object using the default SMTP transport
      // e-mail account that will send the email
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          // e-mail address of company 'bot'
          user: 'web.agcprint@gmail.com',
          // password for the e-mail account
          pass: 'Agc1984print',
        },
      });

      // send mail with defined transport object
      const emailFormat = await transporter.sendMail({
        // sender's e-mail address
        from: '"AGC Print" <web.agcprint@gmail.com>',
        // receiver's e-mail address
        to: 'web.agcprint@gmail.com',
        // subject of the e-mail
        subject:
          '[Order # ' + clientData.orderId + '] New Client Delivery Schedule',
        // content of the e-mail
        html:
          '<p>Dear Staff,</p>' +
          '<p>A new delivery schedule has been set for the order # <b> ' +
          clientData.orderId +
          '</b></p>' +
          '<p><b>Delivery Date</b>: ' +
          clientData.date +
          '</p>' +
          '<p><b>Delivery Time</b>: ' +
          clientData.time +
          '</p>' +
          '<p><b>Details</b>: ' +
          clientData.details +
          '</p>' +
          '<p>You may view the delivery details via the order management portal.</p>' +
          '<p>Thank you and have a great day! </p>' +
          '<p>[Please do not reply to this email. This is an auto-generated message]</p>',
      });
      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
      logger.info('Message sent: ' + emailFormat.messageId);

      return res.status(201).json({
        message: 'E-mail successfully sent!',
      });
    } catch (err) {
      logger.info(err);
      return res.status(500).json({ message: 'Server Error' });
    }
  },

  // email controller method to send an email to inform the staff that a new report has been made
  // used in ReportOrder.vue
  sendEmailNewReport: async (req, res) => {
    try {
      // get the data of the client
      const clientData = {
        orderId: req.body.id,
      };

      // create reusable transporter object using the default SMTP transport
      // e-mail account that will send the email
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          // e-mail address of company 'bot'
          user: 'web.agcprint@gmail.com',
          // password for the e-mail account
          pass: 'Agc1984print',
        },
      });

      // send mail with defined transport object
      const emailFormat = await transporter.sendMail({
        // sender's e-mail address
        from: '"AGC Print" <web.agcprint@gmail.com>',
        // receiver's e-mail address
        to: 'web.agcprint@gmail.com',
        // subject of the e-mail
        subject: '[Order # ' + clientData.orderId + '] New Client Report',
        // content of the e-mail
        html:
          '<p>Dear Staff,</p>' +
          '<p>A new delivery schedule has been set for the order # <b> ' +
          clientData.orderId +
          '</b></p>' +
          '<p>You may view the report details via the order management portal.</p>' +
          '<p>Thank you and have a great day! </p>' +
          '<p>[Please do not reply to this email. This is an auto-generated message]</p>',
      });
      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
      logger.info('Message sent: ' + emailFormat.messageId);

      return res.status(201).json({
        message: 'E-mail successfully sent!',
      });
    } catch (err) {
      logger.info(err);
      return res.status(500).json({ message: 'Server Error' });
    }
  },
};

// export email controller object for routing
export default sendEmail;
