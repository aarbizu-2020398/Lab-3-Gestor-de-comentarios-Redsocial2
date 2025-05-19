import mongoose from 'mongoose';
const { Schema, model, Types } = mongoose;

const publicationSchema = new Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  course: { type: Types.ObjectId, ref: 'Category', required: true },
  date: { type: Date, default: Date.now }
});

export default model('Publication', publicationSchema);
