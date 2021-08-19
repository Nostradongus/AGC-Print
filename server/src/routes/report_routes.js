// import express module for router
import express from 'express';

// import multer for upload configuration of user report files
import multer from 'multer';

// import report controller object for report controller methods
import reportController from '../controller/report_controller.js';

// import jwt token middleware for user authentication
import token from '../middleware/token.js';

// get express router
const router = express.Router();

// set up multer for uploading report files
const reportImageStorage = multer.diskStorage({
  // where the report image files will be uploaded
  destination: function (req, file, cb) {
    cb(null, './src/public/report_images');
  },

  // filename format for report images
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const reportImageUpload = multer({ storage: reportImageStorage });

// route for getting all reports from the database
router.get('/', token.authenticateToken, reportController.getAllReports);

// route for getting all reports of a user from the database
router.get(
  '/:username',
  token.authenticateToken,
  reportController.getUserReports
);

// route for getting a specific report from the database
router.get('/details/:id', token.authenticateToken, reportController.getReport);

// route for adding new report to database
router.post(
  '/add/new',
  token.authenticateToken,
  reportImageUpload.single('report-image'),
  reportController.addReport
);

// route for deleting a report from the database
router.delete(
  '/delete/:id',
  token.authenticateToken,
  reportController.deleteReport
);

// route for updating the status of a report from the database
router.patch(
  '/update/:id',
  token.authenticateToken,
  reportController.updateReportStatus
);

export default router;
