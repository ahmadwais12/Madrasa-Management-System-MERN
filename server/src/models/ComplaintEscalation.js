const mongoose = require('mongoose');
const { Schema } = mongoose;

const ComplaintEscalationSchema = new Schema({
  complaint: { type: Schema.Types.ObjectId, ref: 'Complaint', required: true },
  escalatedFrom: { type: Schema.Types.ObjectId, ref: 'User' },
  escalatedTo: { type: Schema.Types.ObjectId, ref: 'User' },
  escalationReason: { type: String },
  escalationLevel: { type: Number },
  escalationDate: { type: Date, default: Date.now },
  resolutionDeadline: { type: Date },
  escalationStatus: { type: String, enum: ['pending','resolved','ignored'], default: 'pending' }
}, { timestamps: true });

// Indexes
ComplaintEscalationSchema.index({ complaint: 1 });
ComplaintEscalationSchema.index({ escalatedTo: 1 });
ComplaintEscalationSchema.index({ escalationStatus: 1 });

module.exports = mongoose.model('ComplaintEscalation', ComplaintEscalationSchema);
