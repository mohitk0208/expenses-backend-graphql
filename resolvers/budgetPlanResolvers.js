const BudgetPlan = require("../models/budgetPlan")
const User = require("../models/user")


const budgetPlan = async (parent, args, context) => await BudgetPlan.findOne({ id: args.id, userId: context.user.id })



const budgetPlans = async (parent, args, context) => await BudgetPlan.find({ userId: context.user.id })


const addBudgetPlan = async (parent, args, context) => {
  const user = await User.findById(context.user.id)

  const newBudgetPlan = new BudgetPlan({
    perMonthAmount: args.perMonthAmount,
    perDayAmount: args.perDayAmount,
    userId: user.id
  })

  await newBudgetPlan.save()

  return newBudgetPlan;
}


const updateBudgetPlan = async (parent, args, context) => {

  const budgetPlan = await BudgetPlan.findOne({ id: args.id, userId: context.user.id })

  if (!budgetPlan) {
    // TODO
    // raise and error stating
    // that no budget plan with the given id found
  }

  if (args.monthBudget) budgetPlan.perMonthAmount = args.perMonthAmount
  if (args.perDayAmount) budgetPlan.perDayAmount = args.perDayAmount

  await budgetPlan.save()

  return budgetPlan
}


exports.budgetPlan = budgetPlan
exports.budgetPlans = budgetPlans
exports.addBudgetPlan = addBudgetPlan
exports.updateBudgetPlan = updateBudgetPlan