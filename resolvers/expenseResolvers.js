const Expense = require("../models/expense")

const expense = async (parent, args, context) => {
  const e = await Expense.findById(args.id)

  // validate with user
  return e
}

const expenses = async (parent, args, context) => await Expense.find({ user: context.user.id })

exports.expense = expense
exports.expenses = expenses