const mongoose = require("mongoose")

const expenseSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  amount: { type: Number, required: true },
  spentOn: String,
  category: { type: mongoose.Types.ObjectId, required: true, ref: "Category" },
  month: { type: mongoose.Types.ObjectId, required: true, ref: "Month" }
})

module.exports = mongoose.model("Expense", expenseSchema)