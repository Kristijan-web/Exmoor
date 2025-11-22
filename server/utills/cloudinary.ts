import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.API_CLOUDINARY,
  api_secret: process.env.API_PRIVATE_CLOUDINARY,
});

export default cloudinary;
