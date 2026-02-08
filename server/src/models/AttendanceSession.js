const mongoose = require('mongoose');
const { Schema } = mongoose;

const AttendanceSessionSchema = new Schema({
  class: { type: Schema.Types.ObjectId, ref: 'Class', required: true },
  teacher: { type: Schema.Types.ObjectId, ref: 'User' },
  sessionDate: { type: Date, required: true },
  sessionType: { type: String, enum: ['lecture','exam','other'], default: 'lecture' },
  period: { type: Number },
  startTime: { type: Date },
  endTime: { type: Date },
  location: { type: String },
  isLocked: { type: Boolean, default: false }
}, { timestamps: true });

AttendanceSessionSchema.index({ class: 1, sessionDate: 1 });
AttendanceSessionSchema.index({ teacher: 1, sessionDate: 1 });

module.exports = mongoose.model('AttendanceSession', AttendanceSessionSchema);
