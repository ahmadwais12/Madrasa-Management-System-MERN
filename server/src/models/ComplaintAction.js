const mongoose = require('mongoose');
const { Schema } = mongoose;

const ComplaintActionSchema = new Schema({
  complaint: { type: Schema.Types.ObjectId, ref: 'Complaint', required: true },
  actionType: { type: String, trim: true },        
  actionDescription: { type: String },
  actionTakenBy: { type: Schema.Types.ObjectId, ref: 'User' },
  actionDate: { type: Date, default: Date.now },
  actionResult: { type: String },
  nextActionRequired: { type: Boolean, default: false },
  followUpDate: { type: Date },
  visibilityScope: { type: String, enum: ['public','private'], default: 'private' },
  remarks: { type: String }
}, { timestamps: true });

ComplaintActionSchema.index({ complaint: 1 });

module.exports = mongoose.model('ComplaintAction', ComplaintActionSchema);
