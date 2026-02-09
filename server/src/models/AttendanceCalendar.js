const mongoose = require('mongoose');
const { Schema } = mongoose;

const AttendanceCalendarSchema = new Schema({
  date: { type: Date, required: true, unique: true },
  dayType: { type: String, enum: ['class','holiday','special'], default: 'class' },
  description: { type: String, trim: true }
}, { timestamps: true });

// Unique index
AttendanceCalendarSchema.index({ date: 1 }, { unique: true });

module.exports = mongoose.model('AttendanceCalendar', AttendanceCalendarSchema);
