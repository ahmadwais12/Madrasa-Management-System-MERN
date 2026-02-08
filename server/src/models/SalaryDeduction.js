const mongoose = require('mongoose');
const { Schema } = mongoose;

const SalaryDeductionSchema = new Schema({
  employee: { type: Schema.Types.ObjectId, ref: 'Employee', required: true },
  deductionType: { type: String, trim: true },
  deductionReason: { type: String },
  deductionAmount: { type: Number, required: true },
  deductionMonth: { type: Number, min: 1, max: 12 },
  deductionYear: { type: Number },
  appliedBy: { type: Schema.Types.ObjectId, ref: 'Employee' },
  approvedBy: { type: Schema.Types.ObjectId, ref: 'Employee' }
}, { timestamps: true });

SalaryDeductionSchema.index({ employee: 1 });

module.exports = mongoose.model('SalaryDeduction', SalaryDeductionSchema);
