const mongoose = require('mongoose');
const { Schema } = mongoose;

const KitchenExpenseSchema = new Schema({
  expenseDate: { type: Date, default: Date.now },
  expenseType: { type: String },
  relatedPurchase: { type: Schema.Types.ObjectId, ref: 'KitchenPurchase' },
  amount: { type: Number, required: true },
  paymentMethod: { type: String, enum: ['cash','other'], default: 'cash' },
  referenceNo: { type: String },
  paidTo: { type: String },
  approvedBy: { type: Schema.Types.ObjectId, ref: 'User' },
  expenseStatus: { type: String, enum: ['pending','approved','rejected'], default: 'pending' },
  remarks: { type: String }
}, { timestamps: true });

KitchenExpenseSchema.index({ expenseDate: 1 });
KitchenExpenseSchema.index({ relatedPurchase: 1 });

module.exports = mongoose.model('KitchenExpense', KitchenExpenseSchema);

