const mongoose = require("mongoose")

const BudgetPlan = require("../models/budgetPlan")
const User = require("../models/user")


const budgetPlan = async (parent, args, context) => {
  const b = await BudgetPlan.findById(args.id)
  // TODO
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


const updateBudgetPlan = async (parent, args, context) => {

  const budgetPlan = await BudgetPlan.findOne({ id: args.id, user: context.user.id })

  if (!budgetPlan) {
    // TODO
    // raise and error stating
    // that no budget plan with the given id found
  }

  if (args.perDayAmount) budgetPlan.perDayAmount = args.perDayAmount
  if (args.monthBudget) budgetPlan.monthBudget = args.monthBudget

  await budgetPlan.save()

  return budgetPlan

}


exports.budgetPlan = budgetPlan
exports.budgetPlans = budgetPlans
exports.addBudgetPlan = addBudgetPlan
exports.updateBudgetPlan = updateBudgetPlan