const mongoose = require("mongoose")

const Expense = require("../models/expense")
const User = require("../models/user")
const Category = require("../models/category")
const Month = require("../models/Month")



const expense = async (parent, args, context) => await Expense.findOne({ id: args.id, user: context.user.id })


const expenses = async (parent, args, context) => await Expense.find({ user: context.user.id })


const addExpense = async (parent, args, context) => {
  const user = await User.findById(context.user.id)

  const category = await Category.findOne({ id: args.category, user: user.id })

  if (!category) {
    // raise and error that no category with the given id found.
  }

  const resolvedDate = new Date(args.date)

  const sess = await mongoose.startSession()
  sess.startTransaction()

  let month = await Month.findOne({
    user: user.id,
    monthNum: resolvedDate.getMonth(),
    year: resolvedDate.getFullYear()
  })

  if (!month) {

    if (!user.currentBudgetPlan) {
      // raise error
    }

    month = new Month({
      monthNum: resolvedDate.getMonth(),
      year: resolvedDate.getFullYear(),
      budgetPlan: user.currentBudgetPlan
    })
    await month.save({ session: sess })
  }

  const newExpense = new Expense({
    date: args.date,
    amount: args.amount,
    spentOn: args.spentOn || "",
    category: category,
    month: month,
    user: user,
  })


  await newExpense.save({ session: sess })
  await sess.commitTransaction()

  return newExpense
}


const updateExpense = async (parent, args, context) => {

  const user = await User.findById(context.user.id)

  let expense = await Expense.findOne({ id: args.id, user: context.user.id })

  const sess = await mongoose.startSession()
  sess.startTransaction()

  if (args.date) {
    const resolvedDate = new Date(args.date)

    if (expense.monthNum !== resolvedDate.getMonth() || expense.year !== resolvedDate.getFullYear()) {

      const newMonth = await Month.findOne({
        monthNum: resolvedDate.getMonth(),
        year: resolvedDate.getFullYear()
      })

      if (newMonth) {
        expense.month = newMonth
      }
      else {
        const m = new Month({
          monthNum: resolvedDate.getMonth(),
          year: resolvedDate.getFullYear(),
          budgetPlan: user.currentBudgetPlan
        })

        await m.save({ session: sess })
        expense.month = m
      }
    }
  }

  if (args.amount) {
    expense.amount = args.amount
  }

  if (args.spentOn) {
    expense.spentOn = args.spentOn
  }

  await expense.save({ session: sess })
  await sess.commitTransaction()

  return expense
}



exports.expense = expense
exports.expenses = expenses
exports.addExpense = addExpense
exports.updateExpense = updateExpense