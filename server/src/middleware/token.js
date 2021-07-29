import dotenv from 'dotenv-safe';
import jwt from 'jsonwebtoken';

dotenv.config();

// jwtoken middleware object for session control and management methods
const token = {
  // check if valid token
  authenticateToken: async (req, res, nex) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) return res.sendStatus(403);

      req.user = user;
      next();
    });
  },

  // create token for the current user
  generateAccessToken: async (username) => {
    return jwt.sign(username, process.env.ACCESS_TOKEN_SECRET);
  },
};

// export token middleware
export default token;
