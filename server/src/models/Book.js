const mongoose = require('mongoose');
const { Schema } = mongoose;

const BookSchema = new Schema({
  title: { type: String, required: true, trim: true },
  category: { type: Schema.Types.ObjectId, ref: 'BookCategory' },
  pages: { type: Number },
  publisher: { type: String },
  publisherYear: { type: Number },
  coverImage: { type: String },
  stock: { type: Number, default: 0 },
  purchasePrice: { type: Number, default: 0 },
  salePrice: { type: Number, default: 0 },
  addedBy: { type: Schema.Types.ObjectId, ref: 'User' },
  deletedAt: { type: Date, default: null, index: true }
}, { timestamps: true });

BookSchema.index({ title: 1 });

module.exports = mongoose.model('Book', BookSchema);
