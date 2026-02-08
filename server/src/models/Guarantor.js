const mongoose = require('mongoose');
const { Schema } = mongoose;

const GuarantorSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  fullName: { type: String, required: true, trim: true },
  relationship: { type: String, trim: true },
  phoneNumber: { type: String, trim: true },
  whatsapp: { type: String, trim: true },
  permanentAddress: String,
  currentAddress: String,
  job: String,
  isPrimary: { type: Boolean, default: false },
  document: { type: String },
  deletedAt: { type: Date, default: null, index: true }
}, { timestamps: true });

GuarantorSchema.index({ user: 1 });

module.exports = mongoose.model('Guarantor', GuarantorSchema);
