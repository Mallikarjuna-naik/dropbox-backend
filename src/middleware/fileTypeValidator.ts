import { Request, Response, NextFunction } from 'express';

export const validateFileType = (req: Request, res: Response, next: NextFunction): void => {
  const allowedTypes = ['image/png', 'image/jpeg', 'text/plain', 'application/json'];

  console.log("request: ", req);
  if (req.file && !allowedTypes.includes(req.file.mimetype)) {
    res.status(400).json({ error: 'Unsupported file type' });
    return;
  }

  next();
};
