// middleware js for server-side (backend) data validation

// import express-validator for validation methods
import { check } from 'express-validator';

// server-side (backend) data validation object
const validator = {
  // to validate input in the login process
  validateLogin: () => {
    // check username and password input text fields if they are not empty
    // store the results in the array afterwards
    const validation = [
      // checks if the username input field is not empty
      check('username').notEmpty().withMessage('Please input your username.'),
      // checks if the password input field is not empty
      check('password').notEmpty().withMessage('Please input your password.'),
    ];

    return validation;
  },

  // to validate input in the registration process
  validateUserForm: () => {
    // check all input fields in the registration and edit account details form
    // store the results in the array afterwards
    const validation = [
      // checks username input field
      check('username').notEmpty().withMessage('Please input your username.'),
      // checks password input field
      check('password')
        .notEmpty()
        .withMessage('Please input your password.')
        .isLength({ min: 8 })
        .withMessage('Password must be 8 characters.'),
      // checks firstname input field
      check('firstname')
        .notEmpty()
        .withMessage('Please input your first name.'),
      // checks lastname input field
      check('lastname').notEmpty().withMessage('Please input your last name.'),
      // checks email input field
      check('email')
        .notEmpty()
        .withMessage('Please input your email.')
        .isEmail()
        .withMessage('Please input a valid email.'),
      // checks contact number input field
      check('contactNo')
        .notEmpty()
        .withMessage('Please input your contact number.'),
      // checks repeat password input field
      check('confirmPassword')
        .notEmpty()
        .withMessage('Please confirm your password.'),
    ];

    return validation;
  },

  validateUserProfileUpdate: () => {
    const validation = [
      check('email').isEmail().withMessage('Please input a valid email.'),
    ];

    return validation;
  },
};

export default validator;
