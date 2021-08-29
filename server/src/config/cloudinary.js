// import cloudinary module for uploading files in cloud storage
import cloudinary from 'cloudinary';

// get .env config values for cloudinary
import dotenv from 'dotenv-safe';

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default cloudinary;
