// get user service static object from service folder
import UserService from '../service/user_service.js';

// import bcrypt module for password hashing
import bcrypt from 'bcrypt';
const saltRounds = 10;

// for jwtoken session management
import token from '../middleware/token.js';

// index controller object for index controller methods
const indexController = {
  // index controller method to logout user
  getLogout: (req, res) => {
    // destroy user cart session and token
    if (
      typeof req.session.cart !== 'undefined' ||
      typeof req.session.token !== 'undefined'
    ) {
      req.session.destroy();
    }

    return res.status(204).json('LOGOUT');
  },

  // index controller method to login user
  postLogin: async (req, res) => {
    // temporary username and password values
    const username = req.body.username;
    const password = req.body.password;

    // if user data exist in the database
    const user = await UserService.getUser({ username: username });
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

          req.session.token = accessToken;

          // return access token and needed user data
          return res.status(200).json({
            accessToken: accessToken,
            data: userPayload,
            message: 'Successfully Logged In!',
          });
        } else {
          // incorrect password was inputted
          return res.status(403).json({ message: 'Incorrect password!' });
        }
      });
    } else {
      // username does not exist in the database
      return res.status(403).json({ message: 'Username does not exist!' });
    }
  },

  // index controller method to register (add) user to the database
  postRegister: async (req, res) => {
    // check if username already exists in the database
    const userData = await UserService.getUser({ username: req.body.username });

    // check if email already exists in the database
    const emailData = await UserService.getUser({ email: req.body.email });

    // if password and repeat (confirm) password do not match each other
    if (req.body.password !== req.body.repeatPassword) {
      const details = {
        error: 'Password and Repeat Password fields do not match each other.',
      };
      return res.status(422).json(details);
      // if username already exists
    } else if (userData != null) {
      const details = {
        error: 'Username already exists',
      };
      return res.status(422).json(details);
      // if email already exists
    } else if (emailData != null) {
      const details = {
        error: 'E-mail already exists',
      };
      return res.status(422).json(details);
      // add new user to database
    } else {
      // create new user object
      const user = {
        username: req.body.username,
        password: null,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        contactNo: req.body.contactNo,
        email: req.body.email,
      };

      // hash password
      user.password = await bcrypt.hash(req.body.password, saltRounds);

      // add user to database and get user data back
      const result = await UserService.addUser(user);

      // return user data back as indicator of successful registration
      return res.status(201).json(result);
    }
  },
};

// export index routes
export default indexController;
