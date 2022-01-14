const mongoose = require("mongoose")

const expenseSchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  dateSpentOn: { type: Date, required: true },
  spentFor: { type: String },
  month: { type: mongoose.Types.ObjectId, required: true, ref: "Month" },
  type: {
    type: String,
    enum: ["forMonth", "regular"]
  },
  user: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
  category: { type: mongoose.Types.ObjectId, required: true, ref: "Category" }
}, {
  timestamps: true
})

module.exports = mongoose.model("Expense", expenseSchema)