// get user service static object from service folder
import UserService from '../service/user_service.js';

// import bcrypt module for password hashing
import bcrypt from 'bcrypt';
const saltRounds = 10;

// for jwtoken session management
import token from '../middleware/token.js';

// index controller object for index controller methods
const indexController = {
  // index controller method to get to login page
  getLogin: (req, res) => {
    return res.status(200).json('LOGIN PAGE');
  },

  // index controller method to get to register page
  getRegister: (req, res) => {
    return res.status(200).json('REGISTER PAGE');
  },

  // index controller method to get to home page
  getHome: (req, res) => {
    return res.status(200).json('HOME PAGE');
  },

  // index controller method to logout user
  getLogout: (req, res) => {
    // refreshTokens = refreshTokens.filter(token => token != req.body.token);
    // res.sendStatus(204);

    // destroy user cart session
    if (typeof req.session.cart !== 'undefined') {
      req.session.destroy();
    }

    return res.status(204).json('LOGOUT');
  },

  // index controller method to login user
  postLogin: async (req, res) => {
    // temporary username and password values
    const uName = req.body.username;
    const pw = req.body.password;

    // if user data exist in the database
    const user = await UserService.getUser({ username: uName });
    if (user != null) {
      // compare user stored password with the inputted password
      // bcrypt.compare(pw, user.password, function (equal) {
      //   // if password inputted matches the stored password
      //   if (equal) {
      //     const accessToken = jwt.sign(uName, process.env.TOKEN_SECRET);
      //     // send back username to client
      //     return res.json({ accessToken: accessToken });
      //   }
      // });

      // TEMPORARY
      if (pw === user.password) {
        const accessToken = await token.generateAccessToken(user.username);
        // const refreshToken = jwt.sign(user.username, process.env.)
        // send back username to client
        // refreshTokens.push(refreshToken);
        return res.status(200).json({
          accessToken: accessToken,
          username: user.username,
        });
      }
    }

    // username or password is incorrect, send error message
    const details = {
      error: 'Incorrect username or password',
    };
    return res.status(422).json(details);
  },

  // index controller method to register (add) user to the database
  postRegister: async (req, res) => {
    // check if username already exists in the database
    const userData = await UserService.getUser({ username: req.body.username });

    // check if email already exists in the database
    const emailData = await UserService.getUser({ email: req.body.email });

    // if password and repeat (confirm) password do not match each other
    if (req.body.pw !== req.body.repeatPw) {
      const details = {
        error: 'Password and Repeat Password does not match each other.',
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
      user.password = await bcrypt.hash(req.body.pw, saltRounds);

      // add user to database and get user data back
      const result = await UserService.addUser(user);

      // generate jwt access token for session
      const accessToken = await token.generateAccessToken(result.username);

      return res.status(201).json({
        accessToken: accessToken,
        username: result.username,
      });
    }
  },
};

// export index routes
export default indexController;
