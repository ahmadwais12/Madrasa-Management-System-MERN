const mongoose = require('mongoose');
const { Schema } = mongoose;

const BookPurchaseSchema = new Schema({
  purchaseCode: { type: String, unique: true, required: true, trim: true },
  purchaseDate: { type: Date, default: Date.now },
  supplierName: { type: String, trim: true },
  invoiceReference: { type: String, trim: true },
  book: { type: Schema.Types.ObjectId, ref: 'Book', required: true },
  quantity: { type: Number, required: true },
  unit: { type: String, default: 'unit' },
  unitPrice: { type: Number, required: true },
  totalPrice: { type: Number, required: true },
  paymentMethod: { type: String, enum: ['cash','other'], default: 'cash' },
  purchasedBy: { type: Schema.Types.ObjectId, ref: 'User' },
  approvedBy: { type: Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

BookPurchaseSchema.index({ purchaseCode: 1 }, { unique: true });

module.exports = mongoose.model('BookPurchase', BookPurchaseSchema);
