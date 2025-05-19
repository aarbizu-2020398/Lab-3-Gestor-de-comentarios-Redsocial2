import mongoose from 'mongoose';
const { Schema, model, Types } = mongoose;

const commentSchema = new Schema({
  publication: { type: Types.ObjectId, ref: 'Publication', required: true },
  author: { type: String, required: true, trim: true },
  content: { type: String, required: true, trim: true },
  date: { type: Date, default: Date.now }
});

export default model('Comment', commentSchema);
