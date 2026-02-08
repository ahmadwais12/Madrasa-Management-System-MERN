const mongoose = require('mongoose');
const { Schema } = mongoose;

const AccountSchema = new Schema({
  accountCode: { type: String, required: true, trim: true },
  accountName: { type: String, required: true, trim: true },
  accountType: { type: String, enum: ['cash','petty_cash'], default: 'cash' },
  openingBalance: { type: Number, default: 0 },
  currentBalance: { type: Number, default: 0 },
  currency: { type: String, default: 'USD' },
  status: { type: String, enum: ['active','inactive'], default: 'active' },
  createdBy: { type: Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

AccountSchema.index({ accountCode: 1 }, { unique: true });

module.exports = mongoose.model('Account', AccountSchema);
