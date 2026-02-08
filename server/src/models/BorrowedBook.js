const mongoose = require('mongoose');
const { Schema } = mongoose;

const BorrowedBookSchema = new Schema({
  book: { type: Schema.Types.ObjectId, ref: 'Book', required: true },
  borrower: { type: Schema.Types.ObjectId, ref: 'Student', required: true },
  borrowedAt: { type: Date, default: Date.now },
  returnDate: { type: Date },
  status: { type: String, enum: ['borrowed','returned'], default: 'borrowed' }
}, { timestamps: true });

BorrowedBookSchema.index({ book: 1, borrower: 1, status: 1 });

module.exports = mongoose.model('BorrowedBook', BorrowedBookSchema);
