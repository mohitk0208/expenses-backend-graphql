const mongoose = require("mongoose")

const BudgetPlan = require("../models/budgetPlan")
const User = require("../models/user")

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

const addBudgetPlan = async (parent, args, context) => {
  const user = await User.findById(context.user.id)

  const newBudgetPlan = new BudgetPlan({
    perDayAmount: args.perDayAmount,
    monthBudget: args.monthBudget,
    user: user
  })

  const sess = await mongoose.startSession()
  sess.startTransaction()
  await newBudgetPlan.save({ session: sess })
  user.budgetPlans.push(newBudgetPlan)
  await user.save({ session: sess })
  await sess.commitTransaction()

  return newBudgetPlan;
}

exports.budgetPlan = budgetPlan
exports.budgetPlans = budgetPlans
exports.addBudgetPlan = addBudgetPlan