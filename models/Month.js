const mongoose = require("mongoose")

const monthSchema = new mongoose.Schema({
  monthNum: { type: Number, required: true },
  year: { type: Number, required: true },
  user: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
  budgetPlan: { type: mongoose.Types.ObjectId, required: true, ref: "BudgetPlan" },
  expenses: [{ type: mongoose.Types.ObjectId, required: true, ref: "Expense" }]
})

module.exports = mongoose.model("Month", monthSchema)