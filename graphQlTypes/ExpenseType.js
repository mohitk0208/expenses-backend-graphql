const { GraphQLObjectType, GraphQLNonNull, GraphQLString, GraphQLFloat } = require("graphql")

const Expense = require("../models/expense")
const Category = require("../models/category")
const Month = require("../models/Month")
const User = require("../models/user")

const ExpenseType = new GraphQLObjectType({
  name: "Expense",
  description: "a expense object that represents that some money is spent on something.",
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLString) },
    date: { type: GraphQLNonNull(GraphQLString) },
    amount: { type: GraphQLNonNull(GraphQLFloat) },
    category: {
      type: CategoryType,
      resolve: async (expense) => await Category.findById(expense.category)
    },
    month: {
      type: MonthType,
      resolve: async (expense) => await Month.findById(expense.month)
    },
    user: {
      type: UserType,
      resolve: async (expense) => await User.findById(expense.user)
    }
  })
})

module.exports = ExpenseType

// **************************************************8

const CategoryType = require("./CategoryType")
const MonthType = require("./MonthType")
const UserType = require("./UserType")
