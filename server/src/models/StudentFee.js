const mongoose = require('mongoose');
const { Schema } = mongoose;

const StudentFeeSchema = new Schema({
  student: { type: Schema.Types.ObjectId, ref: 'Student', required: true },
  feeStructure: { type: Schema.Types.ObjectId, ref: 'FeeStructure', required: true },
  academicYear: { type: String, required: true },
  totalAmount: { type: Number, required: true },
  discountAmount: { type: Number, default: 0 },
  payableAmount: { type: Number, required: true },
  dueDate: { type: Date },
  paymentStatus: { type: String, enum: ['pending','paid','partial','overdue'], default: 'pending' },
  remarks: String,
  createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
  approvedBy: { type: Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

StudentFeeSchema.index({ student: 1, academicYear: 1 });

module.exports = mongoose.model('StudentFee', StudentFeeSchema);
