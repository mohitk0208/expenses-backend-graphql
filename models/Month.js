const mongoose = require("mongoose")

const monthSchema = new mongoose.Schema({
  monthNum: { type: Number, required: true },
  year: { type: Number, required: true },
  budgetPlan: { type: mongoose.Types.ObjectId, required: true, ref: "BudgetPlan" },
  user: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
},{
  timestamps: true
})

module.exports = mongoose.model("Month", monthSchema)