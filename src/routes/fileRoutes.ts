import express from 'express';
import multer from 'multer';
import { uploadFile, getFileList, downloadFile , getFileById, viewFile} from '../controllers/fileController';
import { validateFileType } from '../middleware/fileTypeValidator';

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

// Routes
router.post(
  '/upload',
  upload.single('file'), // Multer middleware
  validateFileType, // Middleware to validate file types
  uploadFile // Controller function
);

router.get('/getfiles', getFileList); // Get List of all files
router.get('/download/:id', downloadFile); // Download a file
router.get('/getFileById/:id', getFileById); // Get a file by Id
router.get('/viewFile/:id', viewFile); // view a file

export default router;
