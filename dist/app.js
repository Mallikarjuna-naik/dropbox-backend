"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/app.ts
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const fileRoutes_1 = __importDefault(require("./routes/fileRoutes"));
const logger_1 = require("./middleware/logger");
const errorHandler_1 = require("./middleware/errorHandler");
dotenv_1.default.config(); // Load environment variables
const app = (0, express_1.default)();
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(logger_1.logger); // Log requests
// app.use(authenticateUser);  // Optional for authentication
// Routes
app.use('/api', fileRoutes_1.default);
// Error handler middleware
app.use(errorHandler_1.errorHandler);
exports.default = app;
