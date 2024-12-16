import express from 'express';
import multer from 'multer';
import { uploadFile, getFileList, downloadFile , getFileById, viewFile, deleteFile} from '../controllers/fileController';
import { validateFileType } from '../middleware/fileTypeValidator';
import fs from 'fs'; // File system module
import { File } from '../models/fileModel';

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
router.delete('/delete1/:id', deleteFile); // view a file

// DELETE route to remove file
router.delete('/delete/:id', (req, res) => {
  const fileId = req.params.id;
  const filePath = `uploads/${fileId}`;

  console.log("filepath: ",fileId)
  // Check if the file exists and then delete
  fs.unlink(filePath, (err) => {
    if (err) {
      return res.status(500).json({ message: 'Failed to delete the file.', error: err });
    }

    File.deleteOne({ path: fileId })
      .then((result) => {
        if (result.deletedCount === 0) {
          return res.status(404).json({ message: 'File not found in database' });
        }
        res.status(200).json({ message: 'File deleted from database successfully.' });
      })
      .catch((err) => {
        res.status(500).json({ message: 'Error deleting file from database', error: err });
      });
    
        // res.status(200).json({ message: 'File deleted successfully.' });
      });
});

export default router;
