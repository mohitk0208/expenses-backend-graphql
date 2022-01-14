const mongoose = require("mongoose")

const BudgetPlan = require("../models/budgetPlan")
const user = require("../models/user")
const User = require("../models/user")


const budgetPlan = async (parent, args, context) => await BudgetPlan.findOne({ id: args.id, userId: context.user.id })



const budgetPlans = async (parent, args, context) => await BudgetPlan.find({ userId: context.user.id })


const addBudgetPlan = async (parent, args, context) => {
  const user = await User.findById(context.user.id)

  const newBudgetPlan = new BudgetPlan({
    perDayAmount: args.perDayAmount,
    monthBudget: args.monthBudget,
    user: user
  })

  await newBudgetPlan.save()

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