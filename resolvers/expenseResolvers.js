const Expense = require("../models/expense")

const expense = (parent, args, context) => {
  const e = Expense.findById(args.id)

  // validate with user
  return e
}

exports.expense = expense