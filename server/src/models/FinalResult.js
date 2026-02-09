const mongoose = require('mongoose');
const { Schema } = mongoose;

const FinalResultSchema = new Schema({
  student: { type: Schema.Types.ObjectId, ref: 'Student', required: true },
  exam: { type: Schema.Types.ObjectId, ref: 'Exam', required: true },
  class: { type: Schema.Types.ObjectId, ref: 'Class' },
  subject: { type: Schema.Types.ObjectId, ref: 'Subject' },
  totalScore: { type: Number },
  status: { type: String, enum: ['pass','fail'] },
  grade: { type: String, trim: true }
}, { timestamps: true });

FinalResultSchema.index({ student: 1, exam: 1, subject: 1 });

module.exports = mongoose.model('FinalResult', FinalResultSchema);
