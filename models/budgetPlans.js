const mongoose = require("mongoose")

const budgetPlanSchema = new mongoose.Schema({
  perDayAmount: { type: Number, required: true },
  monthBudget: { type: Number, required: true }
})



module.exports = mongoose.model("BudgetPlan", budgetPlanSchema)