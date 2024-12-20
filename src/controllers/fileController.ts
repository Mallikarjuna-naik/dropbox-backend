import { Request, Response, NextFunction } from 'express';
import { File } from '../models/fileModel';
import path from 'path';
import fs from 'fs'; // File system module
// Upload File Controller
export const uploadFile = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (!req.file) {
      res.status(400).json({ error: 'No file uploaded' });
      return;
    }
    console.log("uploaded file: ", req.file);
    const { originalname, mimetype, filename, size, buffer } = req.file;

    const newFile = new File({
      name: originalname,
      mimetype,
      path: filename,
      size: size,
    //   content: buffer.toString(),
    });

    await newFile.save();

    res.status(200).json({ message: 'File uploaded successfully', file: newFile });
  } catch (error:any) {
    next(error);
    // console.error('Error uploading file:', error.message);
    // res.status(500).json({ message: 'Error uploading file' });
  }
};

// Get List of Files Controller
export const getFileList = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const files = await File.find();
    res.status(200).json(files);
  } catch (error) {
    next(error);
  }
};

// Download File Controller
export const downloadFile = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const file = await File.findById(id);

    if (!file) {
      res.status(404).json({ error: 'File not found' });
      return;
    }

    const filePath = path.join(__dirname, '../../uploads', file.path);
    res.download(filePath, file.name);
  } catch (error) {
    next(error);
  }
};

export const getFileById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const file = await File.findById(id);
  
      if (!file) {
        res.status(404).json({ error: 'File not found' });
        return;
      }
  
      // Respond with the file details
      res.status(200).json({
          id: file._id,
          name: file.name,
          type: file.mimetype,
          size: file.size,
        //   content: file.content, // Assuming the file content is stored in the database
          createdAt: file.createdAt,
          updatedAt: file.updatedAt,
        });
    } catch (error) {
      next(error);
    }
  };

  export const viewFile = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const file = await File.findById(id);
  
      if (!file) {
        res.status(404).json({ error: 'File not found' });
        return;
      }
  
      const filePath = path.join(__dirname, '../../uploads', file.path);
  
      if (file.mimetype.startsWith('image')) {
        res.sendFile(filePath);
      } else if (file.mimetype === 'application/json' || file.mimetype === 'text/plain') {
        res.setHeader('Content-Type', file.mimetype);
        res.sendFile(filePath);
      } else {
        res.status(415).json({ error: 'Unsupported file type for viewing' });
      }
    } catch (error) {
      next(error);
    }
  };
  
  export const deleteFile = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
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
  };

