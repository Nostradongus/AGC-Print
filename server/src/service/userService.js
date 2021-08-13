import User from '../model/User.js';

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

export default UserService;
