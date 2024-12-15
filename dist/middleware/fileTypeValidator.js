"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateFileType = void 0;
const validateFileType = (req, res, next) => {
    const allowedTypes = ['image/png', 'image/jpeg', 'text/plain', 'application/json'];
    if (req.file && !allowedTypes.includes(req.file.mimetype)) {
        res.status(400).json({ error: 'Unsupported file type' });
        return;
    }
    next();
};
exports.validateFileType = validateFileType;
