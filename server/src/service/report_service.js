// get Report model in model folder
import Report from '../model/Report.js';

// create report object that contains methods for report data manipulation
const ReportService = {
  // this method retrieves and returns all report data in the database
  // from most recent to least recent
  getAllReports: async () => Report.find({}).sort({ createdAt: 'descending' }),

  // this method retrieves and returns all report data in the database according to given status
  // from most recent to least recent
  getFilteredReports: async (status) =>
    Report.find({ status: status }).sort({ createdAt: 'descending' }),

  // this method retrieves and returns a specific report data based on the given report id
  getReport: async (id) => Report.findOne(id),

  // this method retrieves and returns all reports of a specific user
  // from most recent to least recent
  getUserReports: async (username) =>
    Report.find({ user: username }).sort({ createdAt: 'descending' }),

  // this method adds a new report data to the Report collection in the database
  addReport: async (report) => {
    // insert new report to the database
    const newReport = new Report({
      id: report.id,
      orderSetId: report.orderSetId,
      type: report.type,
      user: report.user,
      userFullName: report.userFullName,
      description: report.description,
      files: report.files,
      status: report.status,
      dateRequested: report.dateRequested,
    });
    newReport.save();

    // return back new report data to the client
    return report;
  },

  // this method adds a staff note to the report data's notes in the database
  updateNote: async (data) =>
    Report.updateOne({ id: data.id }, { notes: data.notes }),

  // this method updates the status of an existing report data from the database
  updateReportStatus: async (data) =>
    Report.updateOne(
      { id: data.id },
      {
        status: data.status,
        comment: data.comment,
        dateUpdated: data.dateUpdated,
      }
    ),

  // this method deletes an existing report from the database
  deleteReport: async (id) => Report.deleteOne(id),
};

// export report service object for report data creation and manipulation
export default ReportService;
