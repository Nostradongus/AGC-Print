// get report service static object from service folder
import ReportService from '../service/report_service.js';

// import fs module for file manipulation
import fs from 'fs';

// import uniqid module for unique id generator
import uniqid from 'uniqid';

// report controller object for report controller methods
const reportController = {
  // report controller method to retrieve and return all reports from the database
  getAllReports: async (req, res) => {
    try {
      // retrieve all reports from the database
      const reports = await ReportService.getAllReports();
      // send the array of reports back to the client
      return res.status(200).json(reports);
    } catch (err) {
      // if error has occurred, send server error status and message
      res.status(500).json({ message: 'Server Error' });
    }
  },

  // report controller method to retrieve and return a specific report from the database
  getReport: async (req, res) => {
    try {
      // retrieve a specific report from the database given the id data from the request
      const report = await ReportService.getReport({ id: req.params.id });
      // if report exists in the database, send the data back to the client
      if (report != null) {
        return res.status(200).json(report);
      }
      // if report does not exist, send error status and message
      return res.status(404).json({ message: 'Report not found!' });
    } catch (err) {
      // if error has occurred, send server error status and message
      res.status(500).json({ message: 'Server Error' });
    }
  },

  // report controller method to retrieve and return all reports of a user from the database
  getUserReports: async (req, res) => {
    try {
      const reports = await ReportService.getUserReports(req.params.username);

      // if there are reports from user, send data back to client
      if (reports != null) {
        return res.status(200).json(reports);
      }

      // if no reports yet from user, send message
      return res
        .status(404)
        .json({ message: 'No reports created from user yet!' });
    } catch (err) {
      // if error has occurred, send server error status and message
      res.status(500).json({ message: 'Server Error' });
    }
  },

  // report controller method to add a new report to the database
  addReport: async (req, res) => {
    try {
      // get today's date
      const date = new Date();
      const year = date.getFullYear().toString();
      const month = (date.getMonth() + 1).toString().padStart(2, 0);
      const day = date.getDate().toString().padStart(2, 0);
      const formattedDate = `${year}-${month}-${day}`;

      // generate new id for report
      const uniqueId = uniqid();

      // get and rename uploaded image, and url path
      const ext = req.file.filename.split('.');
      const filename = `report-${uniqueId}.${ext[1]}`;
      const origFilePath = `./src/public/report_images/${req.file.filename}`;
      const newFilePath = `./src/public/report_images/report-${uniqueId}.${ext[1]}`;
      fs.renameSync(origFilePath, newFilePath);

      // create new report object
      const report = {
        id: uniqueId,
        orderSetId: req.body.orderSetId,
        title: req.body.title,
        type: req.body.type,
        user: req.user.username,
        description: req.body.description,
        img: filename,
        imgPath: newFilePath,
        status: 'Not Yet Resolved',
        dateRequested: formattedDate,
      };

      // add new report to database
      const result = await ReportService.addReport(report);

      // pass new report data back to client
      return res.status(201).json(result);
    } catch (err) {
      // if error has occurred, send server error status and message
      res.status(500).json({ message: 'Server Error' });
    }
  },

  // report controller method to delete a report from the database
  deleteReport: async (req, res) => {
    try {
      // delete a report from the database
      const result = await ReportService.deleteReport({ id: req.params.id });

      // send result back to the client to indicate success
      return res.status(200).json(result);
    } catch (err) {
      // if error has occurred, send server error status and message
      res.status(500).json({ message: 'Server Error' });
    }
  },

  // report controller method to update the status of a report from the database
  updateReportStatus: async (req, res) => {
    try {
      // update a report from the database
      const result = await ReportService.updateReportStatus({
        id: req.params.id,
        status: req.body.status,
      });

      // send result back to the client to indicate success
      return res.status(204).json(result);
    } catch (err) {
      // if error has occurred, send server error status and message
      res.status(500).json({ message: 'Server Error' });
    }
  },
};

// export report controller object for routing
export default reportController;
