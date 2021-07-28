// get user service static object from service folder
import UserService from '../service/user_service.js';

// import bcrypt module for password hashing
import bcrypt from 'bcrypt';
const saltRounds = 10;

// index controller object for index controller methods
const indexController = {
  // index controller method to get to login page
  getLogin: (req, res) => {
    res.send('LOGIN PAGE');
  },
  // index controller method to get to register page
  getRegister: (req, res) => {
    res.send('REGISTER PAGE');
  },
  // index controller method to get to home page
  getHome: (req, res) => {
    res.send('HOME PAGE');
  },
  // index controller method to logout user
  getLogout: (req, res) => {
    res.send('LOGOUT');
  },
  // index controller method to login user
  postLogin: async (req, res) => {
    const uName = req.body.username;
    const pw = req.body.password;

    // if user data exist in the database
    if (UserService.getUser(uName)) {
      // compare user stored password with the inputted password
      bcrypt.compare(pw, res.password, function (equal) {
        // if password inputted matches the stored password
        if (equal) {
          const details = {
            uName: uName,
          };
          // send back username to client
          res.send(details);
        }
      });
    }

    // username or password is incorrect, send error message
    const details = {
      error: 'Incorrect username or password',
    };
    res.send(details);
  },
  // index controller method to register (add) user to the database
  postRegister: async (req, res) => {
    const user = {
      username: req.body.username,
      password: req.body.password,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      contactNo: req.body.contactNo,
      email: req.body.email,
    };

    // if username already exists in the database
    if (UserService.getUser({ username: user.username })) {
      const details = {
        error: 'Username already exists',
      };
      res.send(details);
    } else if (UserService.getUser({ email: user.email })) {
      const details = {
        error: 'E-mail already exists',
      };
      res.send(details);
    } else {
      const user = user;
      bcrypt.hash(user.password, saltRounds, function (err, hash) {
        user.password = hash;
        const user = UserService.addUser(user);
        res.send(user);
      });
    }
  },
};

// export index routes
export default indexController;
