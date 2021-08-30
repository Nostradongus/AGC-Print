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

// NOTE: USE IF UPLOADING IN LOCAL FOLDERS ONLY
// // set up multer for uploading report files
// const reportImageStorage = multer.diskStorage({
//   // where the report image files will be uploaded
//   destination: function (req, file, cb) {
//     // image extensions
//     const imgExtensions = ['png', 'jpg', 'jpeg', 'svg'];

//     // get uploaded file's extension (file type)
//     const filename = file.originalname;
//     const ext = filename.substring(filename.indexOf('.') + 1);

//     // if uploaded order file is a png, jpg, or svg file
//     if (imgExtensions.includes(ext)) {
//       // upload to order images subfolder
//       cb(null, './src/public/report_images');
//     } else {
//       // upload to order documents subfolder
//       cb(null, './src/public/report_docs');
//     }
//   },

//   // filename format for report images
//   filename: function (req, file, cb) {
//     cb(null, file.originalname);
//   },
// });
// const reportFileUpload = multer({ storage: reportImageStorage });

// NOTE: USE IF UPLOADING WITH CLOUDINARY
const reportFileUpload = multer({ storage: multer.diskStorage({}) });

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
  reportFileUpload.any('report-file'),
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
