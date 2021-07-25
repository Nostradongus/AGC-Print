const UserService = require('../service/userService');

exports.getUsers = async (req, res) => {
  try {
    const users = await UserService.getUsers();
    res.send(users);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.getUser = async (req, res) => {
  try {
    const user = await UserService.getUser(req.params.username);
    if (user != null) {
      return res.send(user);
    }
    res.status(404).json({ message: 'User not found!' });
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.addUser = async (req, res) => {
  try {
    const user = await UserService.addUser(req.body);
    res.send(user);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};
