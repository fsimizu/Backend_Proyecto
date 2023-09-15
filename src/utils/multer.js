import multer from "multer";
import { __dirname } from "../config.js";
import path from "path"

const storage = multer.diskStorage({
  destination: (req, file, cb) => {

    console.log("file: ", file);
    
    cb(null, path.join(__dirname, '..', 'public', 'documents'));
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

export const uploader = multer({ storage });