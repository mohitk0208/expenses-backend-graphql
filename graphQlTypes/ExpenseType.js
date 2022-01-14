const { GraphQLObjectType, GraphQLNonNull, GraphQLString, GraphQLFloat, GraphQLEnumType, GraphQLUnionType } = require("graphql")

const Category = require("../models/category")
const Month = require("../models/month")
const User = require("../models/user")

const ExpenseType = new GraphQLObjectType({
  name: "Expense",
  description: "a expense object that represents that some money is spent on something.",
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLString) },
    amount: { type: GraphQLNonNull(GraphQLFloat) },
    dateSpentOn: { type: GraphQLNonNull(GraphQLString) },
    spentFor: { type: GraphQLString },
    monthId: { type: GraphQLNonNull(GraphQLString)},
    type: { type: GraphQLNonNull(GraphQLString) },
    createdAt: { type: GraphQLNonNull(GraphQLString) },
    updatedAt: { type: GraphQLNonNull(GraphQLString) },
    userId: { type: GraphQLNonNull(GraphQLString)},
    categoryId: { type: GraphQLNonNull(GraphQLString)},
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
