const Expense = require("../models/expense")

const expense = async (parent, args, context) => {
  const e = await Expense.findById(args.id)

  // validate with user
  return e
}

exports.expense = expense