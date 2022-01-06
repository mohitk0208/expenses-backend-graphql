const mongoose = require("mongoose")

const Expense = require("../models/expense")
const User = require("../models/user")
const Category = require("../models/category")
const Month = require("../models/Month")



const expense = async (parent, args, context) => {
  const e = await Expense.findById(args.id)

  // validate with user
  return e
}



const expenses = async (parent, args, context) => await Expense.find({ user: context.user.id })



const addExpense = async (parent, args, context) => {
  const user = await User.findById(context.user.id)

  const category = await Category.findOne({ id: args.category, user: user.id })

  if (!category) {
    // raise and error that no category with the given id found.
  }

  const resolvedDate = new Date(args.date)

  let month;
  month = await Month.findOne({
    user: user.id,
    monthNum: resolvedDate.getMonth(),
    year: resolvedDate.getFullYear()
  })

  if (!month) {

    if (!user.currentBudgetPlan) {
      // raise error
    }

    month = await Month({
      monthNum: resolvedDate.getMonth(),
      year: resolvedDate.getFullYear(),
      budgetPlan: user.currentBudgetPlan
    })
  }

  const newExpense = new Expense({
    date: args.date,
    amount: args.amount,
    spentOn: args.spentOn || "",
    category: category,
    month: month,
    user: user,
  })

  const sess = await mongoose.startSession()
  sess.startTransaction()
  await newExpense.save({ session: sess })
  category.expenses.push(newExpense)
  await category.save({ session: sess })
  month.expenses.push(newExpense)
  await month.save({ session: sess })
  await sess.commitTransaction()
}


// const updateExpense = async (parent, args, context) => {

//   let expense = await Expense.findOne({ id: args.id, user: context.user.id })

//   const sess = await mongoose.startSession()
//   sess.startTransaction()

//   if (args.date) {
//     const resolvedDate = new Date(args.date)

//     if (expense.monthNum !== resolvedDate.getMonth() || expense.year !== resolvedDate.getFullYear()) {

//       const oldMonth = await Month.findById(expense.month)

//       oldMonth.expenses.pull()


//     }



//   }


// }



exports.expense = expense
exports.expenses = expenses
exports.addExpense = addExpense