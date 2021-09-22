// import mongoose module for schema modeling
import mongoose from 'mongoose';

// report schema for user reports in the application
const ReportSchema = new mongoose.Schema(
  {
    // unique id of report
    id: {
      type: String,
      required: true,
    },
    // id of order set being referred by the report
    orderSetId: {
      type: String,
      required: true,
    },
    // type of report
    type: {
      type: String,
      required: true,
    },
    // user who made the report
    user: {
      type: String,
      required: true,
    },
    // full name (first and last name) of user who made the report
    userFullName: {
      type: String,
      required: true,
    },
    // description (text content) of the report
    description: {
      type: String,
      required: false,
      default: null,
    },
    // uploaded images of the report
    files: {
      type: Array,
      required: true,
    },
    // status of report (Resolved or Not Yet Resolved)
    status: {
      type: String,
      required: true,
      default: 'Not Yet Resolved',
    },
    // date when the report was created
    dateRequested: {
      type: String,
      required: true,
    },
    // date when the report was resolved or cancelled by staff
    dateUpdated: {
      type: String,
      required: false,
      default: null,
    },
    // staff notes regarding the report
    notes: {
      type: Array,
      required: false,
      default: [],
    },
    // staff comment regarding the resolution or cancellation of the report
    comment: {
      type: String,
      required: false,
      default: null,
    },
    // when the report was created in the database
    timestamp: {
      type: Date,
      default: Date.now(),
    },
  },
  { timestamps: true }
);

// implement report schema as report model
const ReportModel = mongoose.model('Report', ReportSchema);

// export report model for data creation and manipulation
export default ReportModel;
