import express from 'express';
import multer from 'multer';
import { uploadFile, getFileList, downloadFile , getFileById, viewFile} from '../controllers/fileController';
import { validateFileType } from '../middleware/fileTypeValidator';

const router = express.Router();

// Multer Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Define where files are stored
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

router.get('/getfiles', getFileList); // List all files
router.get('/download/:id', downloadFile); // Download a file
router.get('/getFileById/:id', getFileById); 
router.get('/viewFile/:id', viewFile); // view a file

export default router;
