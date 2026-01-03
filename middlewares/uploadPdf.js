import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "franchise-documents",
    resource_type: "raw", // PDF ke liye IMPORTANT
    format: "pdf",
  },
});

const uploadPdf = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== "application/pdf") {
      cb(new Error("Only PDF files allowed"), false);
    }
    cb(null, true);
  },
});

export default uploadPdf;

