const BudgetPlan = require("../models/budgetPlan")

const budgetPlan = async (parent, args, context) => {
  const b = await BudgetPlan.findById(args.id)

  // add check to validate if the budget plan belongs to the user sending the request
  return b
}

const budgetPlans = async (parent, args, context) => {

  const { user } = context

  if (user) {
    const b = await BudgetPlan.find({ user: user.id })

    return b
  }

  return
}

exports.budgetPlan = budgetPlan
exports.budgetPlans = budgetPlans