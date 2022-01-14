const User = require("../models/user")
const BudgetPlan = require("../models/budgetPlan")

const user = async (parent, args, context) => {
  return context.user
}

const updateUser = async (parent, args, context) => {
  const user = await User.findById(context.user.id)

  const newCurrentBudgetPlan = await BudgetPlan.findOne({ userId: user.id, id: args.newCurrentBudgetPlanId })

  if(!newCurrentBudgetPlan) {
    //TODO
    // throw new Error("Budget plan not found")
  }
  user.currentBudgetPlanId = newCurrentBudgetPlan.id
  await user.save()

  return user

}

exports.user = user
exports.updateUser = updateUser