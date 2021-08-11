// import mongoose module for schema modeling
import mongoose from 'mongoose';

// report schema for user reports in the application
const ReportSchema = new mongoose.Schema({
  // unique id of report
  id: {
    type: String,
    required: true,
  },
  // id of order being referred by the report
  orderId: {
    type: String,
    required: true,
  },
  // user who made the report
  user: {
    type: String,
    required: true,
  },
  // text content of the report
  text: {
    type: String,
    required: true,
  },
});

// implement report schema as report model
const ReportModel = mongoose.model('Report', ReportSchema);

// export report model for data creation and manipulation
export default ReportModel;
