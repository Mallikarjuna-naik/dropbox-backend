"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.downloadFile = exports.getFileList = exports.uploadFile = void 0;
const fileModel_1 = require("../models/fileModel");
const path_1 = __importDefault(require("path"));
// Upload File Controller
const uploadFile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.file) {
            res.status(400).json({ error: 'No file uploaded' });
            return;
        }
        const { originalname, mimetype, filename } = req.file;
        const newFile = new fileModel_1.File({
            name: originalname,
            mimetype,
            path: filename,
        });
        yield newFile.save();
        res.status(200).json({ message: 'File uploaded successfully', file: newFile });
    }
    catch (error) {
        next(error);
    }
});
exports.uploadFile = uploadFile;
// Get List of Files Controller
const getFileList = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const files = yield fileModel_1.File.find();
        res.status(200).json(files);
    }
    catch (error) {
        next(error);
    }
});
exports.getFileList = getFileList;
// Download File Controller
const downloadFile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const file = yield fileModel_1.File.findById(id);
        if (!file) {
            res.status(404).json({ error: 'File not found' });
            return;
        }
        const filePath = path_1.default.join(__dirname, '../../uploads', file.path);
        res.download(filePath, file.name);
    }
    catch (error) {
        next(error);
    }
});
exports.downloadFile = downloadFile;
