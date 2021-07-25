const User = require('../model/User');

const UserService = {
  getUsers: async () => User.find({}),
  getUser: async (username) => User.findOne({ username }),
  addUser: async (user) => {
    const newUser = new User({
      fName: user.fName,
      lName: user.lName,
      username: user.username,
      password: user.password,
    });
    return newUser.save();
  },
};

module.exports = UserService;
