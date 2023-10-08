import express, {Request} from 'express';
import {uploadPost} from '../controllers/uploadController';
import multer, {FileFilterCallback} from 'multer';
import {makeThumbnail} from "../../middlewares";
import {OutputUser} from "../../interfaces/User";

const fileFilter = (
  request: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
) => {
  if (file.mimetype.includes('image')) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
const upload = multer({dest: './uploads/', fileFilter});
const router = express.Router();
const uploadProfileImage = multer({dest: './uploads/profiles/', fileFilter});
let id: OutputUser['id'] = '';
router
    .route('/profile')
    .post(uploadProfileImage.single('profile_image' + {id}), makeThumbnail, uploadPost);

export default router;
