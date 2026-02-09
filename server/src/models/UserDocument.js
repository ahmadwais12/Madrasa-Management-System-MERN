const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserDocumentSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, trim: true },
  filePath: { type: String, required: true },
  deletedAt: { type: Date, default: null, index: true }
}, { timestamps: true });

UserDocumentSchema.index({ user: 1 });

module.exports = mongoose.model('UserDocument', UserDocumentSchema);
