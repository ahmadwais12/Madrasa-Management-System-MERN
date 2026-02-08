const mongoose = require('mongoose');
const { Schema } = mongoose;

const AttendanceSummarySchema = new Schema({
  student: { type: Schema.Types.ObjectId, ref: 'Student', required: true },
  month: { type: Number, required: true },
  year: { type: Number, required: true },
  totalSessions: { type: Number, default: 0 },
  presentCount: { type: Number, default: 0 },
  absentCount: { type: Number, default: 0 },
  lateCount: { type: Number, default: 0 },
  leaveCount: { type: Number, default: 0 },
  excusedCount: { type: Number, default: 0 },
  attendancePercentage: { type: Number, default: 0 },
  generatedAt: { type: Date, default: Date.now }
}, { timestamps: true });

AttendanceSummarySchema.index(
  { student: 1, month: 1, year: 1 },
  { unique: true }
);

module.exports = mongoose.model('AttendanceSummary', AttendanceSummarySchema);
