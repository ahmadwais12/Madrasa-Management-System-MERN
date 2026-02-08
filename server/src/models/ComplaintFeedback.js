const mongoose = require('mongoose');
const { Schema } = mongoose;

const ComplaintFeedbackSchema = new Schema({
  complaint: { type: Schema.Types.ObjectId, ref: 'Complaint', required: true },
  feedbackBy: { type: Schema.Types.ObjectId, ref: 'User' },
  satisfactionLevel: { type: Number, min: 1, max: 5 },
  comments: { type: String },
  feedbackDate: { type: Date, default: Date.now },
  resolutionTime: { type: Number },
  escalationRequired: { type: Boolean, default: false }
}, { timestamps: true });

ComplaintFeedbackSchema.index({ complaint: 1 });

module.exports = mongoose.model('ComplaintFeedback', ComplaintFeedbackSchema);
