const mongoose = require('mongoose');
const { Schema } = mongoose;

const SalaryPaymentSchema = new Schema({
  employee: { type: Schema.Types.ObjectId, ref: 'Employee', required: true },
  salaryMonth: { type: Number, min: 1, max: 12 },
  salaryYear: { type: Number },
  grossSalary: { type: Number },
  totalAllowance: { type: Number },
  totalDeduction: { type: Number },
  netSalary: { type: Number },
  paymentDate: { type: Date },
  paymentMethod: { type: String, enum: ['cash','bank'], default: 'cash' },
  transactionReference: { type: String },
  paymentStatus: { type: String, enum: ['pending','completed'], default: 'pending' },
  approvedBy: { type: Schema.Types.ObjectId, ref: 'Employee' },
  paidBy: { type: Schema.Types.ObjectId, ref: 'Employee' }
}, { timestamps: true });

SalaryPaymentSchema.index({ employee: 1, salaryMonth: 1, salaryYear: 1 });

module.exports = mongoose.model('SalaryPayment', SalaryPaymentSchema);
