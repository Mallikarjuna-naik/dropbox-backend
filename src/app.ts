import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fileRoutes from './routes/fileRoutes';
import { logger } from './middleware/logger';
import { errorHandler } from './middleware/errorHandler';
import { authenticateUser } from './middleware/auth';  // Need to implement the authntication

dotenv.config();  // Load environment variables

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(logger);  // Log requests
// app.use(authenticateUser); 

// Routes
app.use('/api', fileRoutes);

// Error handler middleware
app.use(errorHandler);

export default app;
