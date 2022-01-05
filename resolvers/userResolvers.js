const User = require("../models/user")
const BudgetPlan = require("../models/budgetPlan")

const user = async (parent, args, context) => {
  return context.user
}

const updateUser = async (parent, args, context) => {
  const user = await User.findById(context.user.id)

  const newCurrentBudgetPlan = await BudgetPlan.findOne({ user: user.id, id: args.currentBudgetPlan })

  user.currentBudgetPlan = newCurrentBudgetPlan
  await user.save()

  return user

}

exports.user = user
exports.updateUser = updateUser