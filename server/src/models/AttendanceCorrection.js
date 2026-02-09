const mongoose = require('mongoose');
const { Schema } = mongoose;

const AttendanceCorrectionSchema = new Schema({
  record: { type: Schema.Types.ObjectId, ref: 'AttendanceRecord', required: true },
  oldStatus: { type: String, enum: ['present','absent','late','excused'] },
  newStatus: { type: String, enum: ['present','absent','late','excused'] },
  correctionReason: { type: String },
  correctedBy: { type: Schema.Types.ObjectId, ref: 'User' },
  correctedAt: { type: Date, default: Date.now }
}, { timestamps: true });

// Index for lookup by attendance record
AttendanceCorrectionSchema.index({ record: 1, correctedAt: -1 });

module.exports = mongoose.model('AttendanceCorrection', AttendanceCorrectionSchema);
