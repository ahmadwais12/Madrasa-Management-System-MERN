const mongoose = require('mongoose');
const { Schema } = mongoose;

const AttendanceRecordSchema = new Schema({
  session: { type: Schema.Types.ObjectId, ref: 'AttendanceSession', required: true },
  student: { type: Schema.Types.ObjectId, ref: 'Student', required: true },
  status: { type: String, enum: ['present','absent','late','excused'], required: true },
  lateMinutes: { type: Number, default: 0 },
  remarks: { type: String },
  markedBy: { type: Schema.Types.ObjectId, ref: 'User' },
  markedAt: { type: Date }
}, { timestamps: true });

// Prevent duplicates
AttendanceRecordSchema.index(
  { session: 1, student: 1 },
  { unique: true }
);

module.exports = mongoose.model('AttendanceRecord', AttendanceRecordSchema);
