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
    return res.json('LOGIN PAGE');
  },
  // index controller method to get to register page
  getRegister: (req, res) => {
    return res.json('REGISTER PAGE');
  },
  // index controller method to get to home page
  getHome: (req, res) => {
    return res.json('HOME PAGE');
  },
  // index controller method to logout user
  getLogout: (req, res) => {
    // refreshTokens = refreshTokens.filter(token => token != req.body.token);
    // res.sendStatus(204);
    return res.json('LOGOUT');
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
        const accessToken = token.generateAccessToken(user.username);
        // const refreshToken = jwt.sign(user.username, process.env.)
        // send back username to client
        // refreshTokens.push(refreshToken);
        return res.json({
          accessToken: accessToken,
          username: user.username,
        });
      }
    }

    // username or password is incorrect, send error message
    const details = {
      error: 'Incorrect username or password',
    };
    return res.json(details);
  },

  // index controller method to register (add) user to the database
  postRegister: async (req, res) => {
    // if username already exists in the database
    const userData = await UserService.getUser({ username: req.body.username });
    const emailData = await UserService.getUser({ email: req.body.email });
    if (userData != null) {
      const details = {
        error: 'Username already exists',
      };
      return res.json(details);
    } else if (emailData != null) {
      const details = {
        error: 'E-mail already exists',
      };
      return res.json(details);
    } else {
      bcrypt.hash(req.body.pw, saltRounds, function (err, hash) {
        const user = {
          username: req.body.username,
          password: hash,
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          contactNo: req.body.contactNo,
          email: req.body.email,
        };
        const result = UserService.addUser(user);
        // const accessToken = token.generateAccessToken(result.username);

        return res.json({
          // accessToken: accessToken,
          username: result.username,
        });
      });
    }
  },
};

// export index routes
export default indexController;
