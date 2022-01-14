const mongoose = require("mongoose")

const monthSchema = new mongoose.Schema({
  monthNum: { type: Number, required: true },
  year: { type: Number, required: true },
  budgetPlanId: { type: mongoose.Types.ObjectId, required: true, ref: "BudgetPlan" },
  userId: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
},{
  timestamps: true
})

module.exports = mongoose.model("Month", monthSchema)