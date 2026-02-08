const mongoose = require('mongoose');
const { Schema } = mongoose;

const DailyFoodConsumptionSchema = new Schema({
  consumptionDate: { type: Date, required: true },
  mealType: { type: String, enum: ['breakfast','lunch','dinner'], required: true },
  numberOfStudents: { type: Number, default: 0 },
  numberOfStaff: { type: Number, default: 0 },
  itemName: { type: String },
  quantityUsed: { type: Number },
  unit: { type: String },
  preparedBy: { type: String },
  supervisedBy: { type: String },
  remarks: { type: String }
}, { timestamps: true });

// Compound unique for date + meal type
DailyFoodConsumptionSchema.index(
  { consumptionDate: 1, mealType: 1 },
  { unique: true }
);

module.exports = mongoose.model('DailyFoodConsumption', DailyFoodConsumptionSchema);
