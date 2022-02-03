const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  folder: "NFTs",
  //  params below is only needed if uploading media types other than images (video, audio...)
  // params: {
  //     ressource_type: "raw"
  // }
});

const fileUploader = multer({ storage });

module.exports = fileUploader;
