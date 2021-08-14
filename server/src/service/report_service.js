// get Report model in models folder
import Report from '../model/Report.js';

// create report object that contains methods for report data manipulation
const ReportService = {
  // this method retrieves and returns all report data in the database
  getAllReports: async () => Report.find({}),

  // this method retrieves and returns a specific report data based on the given report id
  getReport: async (id) => Report.findOne(id),

  // this method retrieves and returns all reports of a specific user
  getUserReports: async (username) => Report.find({ user: username }),

  // this method adds a new report data to the Report collection in the database
  addReport: async (report) => {
    // insert new report to the database
    const newReport = new Report({
      id: report.id,
      orderSetId: report.orderSetId,
      title: report.title,
      type: report.type,
      user: report.user,
      description: report.description,
      img: report.img,
      imgPath: report.imgPath,
      status: report.status,
      dateRequested: report.dateRequested,
    });
    newReport.save();

    // return back new report data to the client
    return report;
  },

  // this method updates the status of an existing report data from the database
  updateReportStatus: async (data) =>
    Report.updateOne({ id: data.id }, { status: data.status }),

  // this method deletes an existing report from the database
  deleteReport: async (id) => Report.deleteOne(id),
};

// export report service object for report data creation and manipulation
export default ReportService;
