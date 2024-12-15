"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const fileController_1 = require("../controllers/fileController");
const fileTypeValidator_1 = require("../middleware/fileTypeValidator");
const router = express_1.default.Router();
// Multer Configuration
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Define where files are stored
    },
    filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${file.originalname}`;
        cb(null, uniqueName);
    },
});
const upload = (0, multer_1.default)({ storage });
// Routes
router.post('/upload', upload.single('file'), // Multer middleware
fileTypeValidator_1.validateFileType, // Middleware to validate file types
fileController_1.uploadFile // Controller function
);
router.get('/files', fileController_1.getFileList); // List all files
router.get('/files/:id', fileController_1.downloadFile); // Download a file
exports.default = router;
