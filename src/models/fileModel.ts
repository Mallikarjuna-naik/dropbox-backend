import mongoose from 'mongoose';

const fileSchema = new mongoose.Schema({
  name: { type: String, required: true },
  mimetype: { type: String, required: true },
  path: { type: String, required: true },
  content: { type: Buffer },
  size: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export const File = mongoose.model('File', fileSchema);
