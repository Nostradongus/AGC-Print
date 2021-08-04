// get User model in models folder
import User from '../model/User.js';

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
    });

    // add new user account data to the User collection
    return newUser.save();
  },
};

// export user service object for user account data creation and manipulation
export default UserService;
