const BudgetPlan = require("../models/budgetPlan")

const budgetPlan = async (parent, args, context) => {
  const b = await BudgetPlan.findById(args.id)

  // add check to validate if the budget plan belongs to the user sending the request
  return b
}

exports.budgetPlan = budgetPlan