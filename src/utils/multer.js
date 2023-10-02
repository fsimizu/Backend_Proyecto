import multer from "multer";
import path from "path";
import { __dirname } from "../config.js";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {

    cb(null, path.join(__dirname, '..', 'public', file.fieldname));
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);

    if (file.fieldname === 'profiles') {
      cb(null, `${req.params._id}.jpeg`);
    }
    else if (file.fieldname === 'documents') {
      cb(null, `${req.params._id}_${req.body.type}${ext}`);
    }

    else if (file.fieldname === 'products') {
      let newFileName = `${req.params.pid}.jpeg`;
      cb(null, newFileName);
    }

    else {
      cb(null, `${file.originalname}`);
    }  

  },
});

export const uploader = multer({ storage });