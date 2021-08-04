// get User model in models folder
import User from '../model/User.js';
import bcrypt from 'bcrypt';
import { SALT_ROUNDS } from '../config/constants.js';

// create service object that contains methods for user account data manipulation
const UserService = {
  // this method retrieves and returns all user account data in the database
  getUsers: async () => User.find({}),
  // this method retrieves and returns a specific user account data based on given data
  getUser: async (data) => User.findOne(data),
  // this method adds a new user account data to the User collection in the database
  addUser: async (user) => {
    // create new User data object
    const newUser = new User({
      username: user.username,
      password: user.password,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      contactNo: user.contactNo,
      orders: [],
    });
    // add new user account data to the User collection
    return newUser.save();
  },
  updateUser: async (data) => {
    try {
      const user = await UserService.getUser({
        username: data.params.username,
      });

      const { firstname, lastname, contactNo, email, password } = data.body;
      const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

      if (firstname !== '') {
        user.firstname = firstname;
      }

      if (lastname !== '') {
        user.lastname = lastname;
      }

      if (password !== '') {
        user.password = hashedPassword;
      }

      if (contactNo !== '') {
        user.contactNo = contactNo;
      }

      if (email !== '') {
        user.email = email;
      }

      return user.save();
    } catch (err) {
      throw err;
    }
  },
};

// export user service object for user account data creation and manipulation
export default UserService;
