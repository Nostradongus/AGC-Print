import dotenv from 'dotenv-safe';
import jwt from 'jsonwebtoken';

dotenv.config();

// jwtoken middleware object for session control and management methods
const token = {
  // checks if token is valid then returns the current user data payload
  authenticateToken: async (req, res, nex) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) return res.sendStatus(403);

      // get username
      req.user = user.username;

      next();
    });
  },

  // create token for the current user
  generateAccessToken: async (data) => {
    const test = jwt.sign(data, process.env.ACCESS_TOKEN_SECRET);
    return test;
  },
};

// export token middleware
export default token;
