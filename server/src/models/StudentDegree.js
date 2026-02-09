const mongoose = require('mongoose');
const { Schema } = mongoose;

const StudentDegreeSchema = new Schema({
  student: { type: Schema.Types.ObjectId, ref: 'Student', required: true },
  degree: { type: Schema.Types.ObjectId, ref: 'Degree', required: true },
  academicYear: { type: String },
  status: { type: String, enum: ['active','inactive'], default: 'active' }
}, { timestamps: true });

// Unique compound
StudentDegreeSchema.index(
  { student: 1, degree: 1, academicYear: 1 },
  { unique: true }
);

module.exports = mongoose.model('StudentDegree', StudentDegreeSchema);
