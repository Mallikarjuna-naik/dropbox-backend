"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToDatabase = void 0;
// src/services/dbService.ts
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
// Load environment variables from .env in the root directory
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, '../.env') });
const connectToDatabase = () => {
    const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/dropbox'; // Default to local MongoDB if not set
    mongoose_1.default.connect(mongoURI, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
    })
        .then(() => console.log('Connected to MongoDB'))
        .catch((error) => console.error('Error connecting to MongoDB:', error));
};
exports.connectToDatabase = connectToDatabase;
