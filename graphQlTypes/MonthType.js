const { GraphQLObjectType, GraphQLNonNull, GraphQLString, GraphQLInt, GraphQLList } = require("graphql")

const BudgetPlan = require("../models/budgetPlan")
const User = require("../models/user")
const Expense = require("../models/expense")

const MonthType = new GraphQLObjectType({
  name: "Month",
  description: "a month specific global data store to store month related constants and data.",
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLString) },
    monthNum: { type: GraphQLNonNull(GraphQLInt) },
    year: { type: GraphQLNonNull(GraphQLInt) },
    budgetPlanId: { type: GraphQLNonNull(GraphQLString) },
    createdAt: { type: GraphQLNonNull(GraphQLString) },
    updatedAt: { type: GraphQLNonNull(GraphQLString) },
    userId: {type: GraphQLNonNull(GraphQLString)},
    budgetPlan: {
      type: BudgetPlanType,
      resolve: async (month) => await BudgetPlan.findById(month.budgetPlanId)
    },
    expenses: {
      type: GraphQLList(ExpenseType),
      resolve: async (month) => await Expense.find({ monthId: month.id })
    },
    user: {
      type: UserType,
      resolve: async (month) => await User.findById(month.userId)
    }
  })
})

module.exports = MonthType

// *****************************************************

const BudgetPlanType = require("./BudgetPlanType");
const ExpenseType = require("./ExpenseType");
const UserType = require("./UserType");
