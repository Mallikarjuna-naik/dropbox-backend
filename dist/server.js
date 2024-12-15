"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/server.ts
const app_1 = __importDefault(require("./app"));
const dbService_1 = require("./services/dbService");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
// Create uploads folder if it doesn't exist
const uploadDir = path_1.default.join(__dirname, '../uploads');
if (!fs_1.default.existsSync(uploadDir)) {
    fs_1.default.mkdirSync(uploadDir);
}
// Connect to MongoDB
(0, dbService_1.connectToDatabase)();
// Start the server
const PORT = process.env.PORT || 3000;
app_1.default.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
