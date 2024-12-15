// src/services/dbService.ts
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env in the root directory
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const connectToDatabase = () => {
  const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/dropbox';  // Default to local MongoDB if not set
  console.log("mongoURI", process.env.MONGO_URI);
  mongoose.connect(mongoURI, {})
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => console.error('Error connecting to MongoDB:', error));
};

export { connectToDatabase };
