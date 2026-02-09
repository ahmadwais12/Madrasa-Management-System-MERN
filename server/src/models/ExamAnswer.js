const mongoose = require('mongoose');
const { Schema } = mongoose;

const ExamAnswerSchema = new Schema({
  exam: { type: Schema.Types.ObjectId, ref: 'Exam', required: true },
  question: { type: Schema.Types.ObjectId, ref: 'ExamQuestion', required: true },
  student: { type: Schema.Types.ObjectId, ref: 'Student', required: true },
  answer: { type: String },
  status: { type: String, enum: ['full','partial','pending'], default: 'pending' },
  submission: { type: String }
}, { timestamps: true });

// Compound unique to prevent duplicates
ExamAnswerSchema.index(
  { exam: 1, question: 1, student: 1 },
  { unique: true }
);

module.exports = mongoose.model('ExamAnswer', ExamAnswerSchema);
