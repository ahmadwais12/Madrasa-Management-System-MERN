const mongoose = require('mongoose');
const { Schema } = mongoose;

const ExamSchema = new Schema({
  title: { type: String, required: true, trim: true },
  examType: { type: Schema.Types.ObjectId, ref: 'ExamType' },
  academicYear: { type: String },
  startDate: { type: Date },
  endDate: { type: Date },
  status: { 
    type: String, 
    enum: ['scheduled','ongoing','finished','cancelled'], 
    default: 'scheduled' 
  }
}, { timestamps: true });

ExamSchema.index({ academicYear: 1 });
ExamSchema.index({ examType: 1 });

module.exports = mongoose.model('Exam', ExamSchema);
