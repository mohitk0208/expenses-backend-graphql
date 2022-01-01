const { GraphQLObjectType, GraphQLNonNull, GraphQLString, GraphQLFloat } = require("graphql")

const Expense = require("../models/expense")

const ExpenseType = new GraphQLObjectType({
  name: "Expense",
  description: "a expense object that represents that some money is spent on something.",
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLString) },
    date: { type: GraphQLNonNull(GraphQLString) },
    amount: { type: GraphQLNonNull(GraphQLFloat) },
    category: {
      type: CategoryType,
      resolve: async (expense) => await Expense.findById(expense.id).populate("category").category
    },
    month: {
      type: MonthType,
      resolve: async (expense) => await Expense.findById(expense.id).populate("month").month
    },
    user: {
      type: UserType,
      resolve: async (expense) => await Expense.findById(expense.id).populate("user").user
    }
  })
})

module.exports = ExpenseType

// **************************************************8

const CategoryType = require("./CategoryType")
const MonthType = require("./MonthType")
const UserType = require("./UserType")
