// get report service static object from service folder
import ReportService from '../service/report_service.js';

// import cloudinary for cloud storage file uploading
import cloudinary from '../config/cloudinary.js';

// import fs module for file manipulation
// eslint-disable-next-line no-unused-vars
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

      // send array of reports back to client
      return res.status(200).json(reports);
    } catch (err) {
      // if error has occurred, send server error status and message
      res.status(500).json({ message: 'Server Error' });
    }
  },

  // report controller method to retrieve and return all reports from the database according to given status
  getFilteredReports: async (req, res) => {
    try {
      // retrieve all reports from the database according to given status
      const reports = await ReportService.getFilteredReports(req.params.status);

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

  // report controller method to retrieve and return a specific report from the database
  // given order set id
  getOrderSetReport: async (req, res) => {
    try {
      // retrieve a specific report from the database given the id data from the request
      const report = await ReportService.getReport({
        orderSetId: req.params.id,
      });
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

      // get and rename all uploaded images, and url paths
      // image extensions
      const imgExtensions = ['png', 'jpg', 'jpeg', 'svg'];
      const files = [];

      for (let ctr = 0; ctr < req.files.length; ctr++) {
        /* NOTE: USE IF UPLOADING FROM LOCAL STORAGE ONLY */
        // // get file extension and create filename format for uploaded report file
        // const ext = req.files[ctr].filename.substring(
        //   req.files[ctr].filename.indexOf('.') + 1
        // );
        // const filename = `report-${uniqueId}-${ctr}.${ext}`;
        // // public subfolder directory where the order file will be transferred and uploaded
        // let folder = 'report_images';
        // // if uploaded order file is not an image format
        // if (!imgExtensions.includes(ext)) {
        //   // report file shall be transferred and uploaded to the report_docs public subfolder
        //   folder = 'report_docs';
        // }
        // // old path and new path
        // const origFilePath = `./src/public/${folder}/${req.files[ctr].filename}`;
        // const newFilePath = `./src/public/${folder}/${filename}`;
        // // rename uploaded report file
        // fs.renameSync(origFilePath, newFilePath);
        // // create new report image file object
        // const file = {
        //   filename: filename,
        //   filePath: newFilePath,
        // };

        /* NOTE: USE IF UPLOADING WITH CLOUDINARY */
        // get file extension and create designated filename format for uploaded report file
        const ext = req.files[ctr].originalname.substring(
          req.files[ctr].originalname.indexOf('.') + 1
        );
        const filename = `report-${uniqueId}-${ctr}`;
        // cloudinary directory where the report file will be uploaded
        let folder = 'report_images';
        // if report file is not in image format
        if (!imgExtensions.includes(ext)) {
          folder = 'report_docs';
        }
        // upload to cloudinary
        const result = await cloudinary.v2.uploader.upload(
          req.files[ctr].path,
          {
            public_id: filename,
            folder: folder,
          }
        );
        // create new report image file object
        const file = {
          filename: result.public_id,
          filePath: result.secure_url,
        };

        // store in list of files for the new report
        files.push(file);
      }

      // create new report object
      const report = {
        id: uniqueId,
        orderSetId: req.body.orderSetId,
        type: req.body.type,
        user: req.user.username,
        description: req.body.description,
        files: files,
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
