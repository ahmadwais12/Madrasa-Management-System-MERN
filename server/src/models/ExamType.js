const mongoose = require('mongoose');
const { Schema } = mongoose;

const ExamTypeSchema = new Schema({
  name: { type: String, required: true, trim: true },
  deletedAt: { type: Date, default: null, index: true }
}, { timestamps: true });

ExamTypeSchema.index({ name: 1 }, { unique: true });

module.exports = mongoose.model('ExamType', ExamTypeSchema);
