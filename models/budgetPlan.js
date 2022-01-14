const mongoose = require("mongoose")

const budgetPlanSchema = new mongoose.Schema({
  perDayAmount: { type: Number, required: true },
  perMonthAmount: { type: Number, required: true },
  user: { type: mongoose.Types.ObjectId, required: true, ref: "User" }
}, {
  timestamps: true
})



module.exports = mongoose.model("BudgetPlan", budgetPlanSchema)