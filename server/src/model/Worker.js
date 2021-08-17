// import mongoose module for schema modeling
import mongoose from 'mongoose';

// worker schema for system admin / worker accounts in the application
const WorkerSchema = new mongoose.Schema({
  // the worker's username
  username: {
    type: String,
    required: true,
  },
  // the worker's password
  password: {
    type: String,
    required: true,
  },
  // the worker's first name
  firstname: {
    type: String,
    required: true,
  },
  // the worker's last name
  lastname: {
    type: String,
    required: true,
  },
  // the worker's email address
  email: {
    type: String,
    required: true,
  },
  // the worker's contact number; starts with "63"
  contactNo: {
    type: String,
    required: true,
  },
  // if the worker is a system administrator or not
  isSystemAdmin: {
    type: Boolean,
    required: false,
  },
});

// implement worker schema as worker model
const WorkerModel = mongoose.model('Worker', WorkerSchema);

// export worker model for data creation and manipulation
export default WorkerModel;
