const mongoose = require("mongoose")

const Expense = require("../models/expense")
const User = require("../models/user")
const Category = require("../models/category")
const Month = require("../models/Month")



const expense = async (parent, args, context) => await Expense.findOne({ id: args.id, userId: context.user.id })


const expenses = async (parent, args, context) => await Expense.find({ userId: context.user.id })


const addExpense = async (parent, args, context) => {
  const user = await User.findById(context.user.id)

  const category = await Category.findOne({ id: args.categoryId, userId: user.id })

  if (!category) {
    // raise and error that no category with the given id found.
  }

  const resolvedDate = new Date(args.dateSpentOn)

  const sess = await mongoose.startSession()
  sess.startTransaction()

  let month = await Month.findOne({
    userId: user.id,
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
      budgetPlanId: user.currentBudgetPlanId,
      userId: user
    })
    await month.save({ session: sess })
  }

  const newExpense = new Expense({
    amount: args.amount,
    dateSpentOn: args.dateSpentOn,
    spentFor: args.spentFor || "",
    type: args.type,
    categoryId: category,
    monthId: month,
    userId: user,
  })


  await newExpense.save({ session: sess })
  await sess.commitTransaction()

  return newExpense
}


const updateExpense = async (parent, args, context) => {

  const user = await User.findById(context.user.id)

  let expense = await Expense.findOne({ id: args.id, userId: context.user.id }).populate("monthId")

  const sess = await mongoose.startSession()
  sess.startTransaction()

  if (args.dateSpentOn) {
    const resolvedDate = new Date(args.dateSpentOn)

    if (expense.monthId.monthNum !== resolvedDate.getMonth() || expense.monthId.year !== resolvedDate.getFullYear()) {

      const changedMonth = await Month.findOne({
        monthNum: resolvedDate.getMonth(),
        year: resolvedDate.getFullYear(),
        userId: user.id
      })

      if (changedMonth) {
        expense.monthId = changedMonth
      }
      else {

        if(!user.currentBudgetPlanId) {
          // raise an error to set user a currentBudgetPlan
        }

        const newMonth = new Month({
          monthNum: resolvedDate.getMonth(),
          year: resolvedDate.getFullYear(),
          budgetPlanId: user.currentBudgetPlanId
        })

        await newMonth.save({ session: sess })
        expense.monthId = newMonth
      }
    }
  }

  if (args.amount) {
    expense.amount = args.amount
  }

  if (args.spentFor) {
    expense.spentFor = args.spentFor
  }

  await expense.save({ session: sess })
  await sess.commitTransaction()

  return expense
}



exports.expense = expense
exports.expenses = expenses
exports.addExpense = addExpense
exports.updateExpense = updateExpense