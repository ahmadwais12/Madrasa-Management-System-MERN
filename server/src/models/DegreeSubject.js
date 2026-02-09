const mongoose = require('mongoose');
const { Schema } = mongoose;

const DegreeSubjectSchema = new Schema({
  teacher: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  degree: { type: Schema.Types.ObjectId, ref: 'Degree', required: true },
  subject: { type: Schema.Types.ObjectId, ref: 'Subject', required: true },
  period: { type: Number },
  studyDaysPerWeek: { type: Number },
  startTime: { type: String },
  endTime: { type: String },
  academicYear: { type: String },
  status: { type: String, enum: ['active','inactive'], default: 'active' },
  deletedAt: { type: Date, default: null, index: true }
}, { timestamps: true });

// Index for search
DegreeSubjectSchema.index({ teacher: 1, degree: 1, academicYear: 1 });

module.exports = mongoose.model('DegreeSubject', DegreeSubjectSchema);
