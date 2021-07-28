// import mongoose module for schema modeling
import mongoose from 'mongoose';

// user schema for user accounts in the application
const UserSchema = new mongoose.Schema({
  // the user's username
  username: {
    type: String,
    required: true,
  },
  // the user's password
  password: {
    type: String,
    required: true,
  },
  // the user's first name
  firstname: {
    type: String,
    required: true,
  },
  // the user's last name
  lastname: {
    type: String,
    required: true,
  },
  // the user's email address
  email: {
    type: String,
    required: true,
  },
  // the user's contact number; starts with "63"
  contactNo: {
    type: String,
    required: true,
  },
});

// implement user schema as user model
const UserModel = mongoose.model('User', UserSchema);

// export user model for data creation and manipulation
export default UserModel;
