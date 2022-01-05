const { GraphQLObjectType, GraphQLNonNull, GraphQLString, GraphQLInt, GraphQLList } = require("graphql")

const Month = require("../models/Month")
const BudgetPlan = require("../models/budgetPlan")
const User = require("../models/user")
const Expense = require("../models/expense")

const MonthType = new GraphQLObjectType({
  name: "Month",
  description: "a month specific global data store to store month related constants and data.",
  fields: () => ({
    monthNum: { type: GraphQLNonNull(GraphQLInt) },
    year: { type: GraphQLNonNull(GraphQLInt) },
    budgetPlan: {
      type: BudgetPlanType,
      resolve: async (month) => await BudgetPlan.findById(month.budgetPlan)
    },
    expenses: {
      type: GraphQLList(ExpenseType),
      resolve: async (month) => await Expense.find({month: month.id})
    },
    user: {
      type: UserType,
      resolve: async (month) => await User.findById(month.user)
    }
  })
})

module.exports = MonthType

// *****************************************************

const BudgetPlanType = require("./BudgetPlanType");
const ExpenseType = require("./ExpenseType");
const UserType = require("./UserType");
