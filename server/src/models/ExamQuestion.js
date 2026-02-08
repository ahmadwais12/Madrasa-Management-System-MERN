const mongoose = require('mongoose');
const { Schema } = mongoose;

const ExamQuestionSchema = new Schema({
  exam: { type: Schema.Types.ObjectId, ref: 'Exam', required: true },
  class: { type: Schema.Types.ObjectId, ref: 'Class' },
  subject: { type: Schema.Types.ObjectId, ref: 'Subject' },
  question: { type: String, required: true },
  answer: { type: String },
  createdBy: { type: Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

ExamQuestionSchema.index({ exam: 1, subject: 1 });

module.exports = mongoose.model('ExamQuestion', ExamQuestionSchema);
