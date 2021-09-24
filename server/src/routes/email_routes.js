// import express module for router
import express from 'express';

// import email controller object for email controller methods
import emailController from '../controller/email_controller.js';

// import jwt token middle for user authentication
import token from '../middleware/token.js';

// get express router
const router = express.Router();

// route for sending email to inform the client that their order is confirmed
router.post(
  '/client/sendEmailOrderPlaced',
  token.authenticateToken,
  emailController.sendEmailOrderPlaced
);

// route for sending email about the client's project cost
router.post(
  '/client/sendEmailProjectCost',
  token.authenticateToken,
  emailController.sendEmailProjectCost
);

// route for sending email to inform the client that their order is being processed
router.post(
  '/client/sendEmailProcessingOrder',
  token.authenticateToken,
  emailController.sendEmailProcessingOrder
);

// route for sending email to inform the client that their report is noted
router.post(
  '/client/sendEmailReport',
  token.authenticateToken,
  emailController.sendEmailReport
);

// route for sending email to inform the client that their order is complete
router.post(
  '/client/sendEmailOrderComplete',
  token.authenticateToken,
  emailController.sendEmailOrderComplete
);

// route for sending email to inform the client that their order is complete
router.post(
  '/client/sendEmailReadyForDelivery',
  token.authenticateToken,
  emailController.sendEmailReadyForDelivery
);

// route for sending email to inform the staff that a client has placed a new order
router.post(
  '/staff/sendEmailNewOrder',
  token.authenticateToken,
  emailController.sendEmailNewOrder
);

// route for sending email to inform the staff that a client has made a new payment
router.post(
  '/staff/sendEmailNewPayment',
  token.authenticateToken,
  emailController.sendEmailNewPayment
);

// route for sending email to inform the staff that a client has set a new delivery schedule
router.post(
  '/staff/sendEmailNewDelivery',
  token.authenticateToken,
  emailController.sendEmailNewDelivery
);

// route for sending email to inform the staff that a client has made a report
router.post(
  '/staff/sendEmailNewReport',
  token.authenticateToken,
  emailController.sendEmailNewReport
);

// export email routes
export default router;
