const { GraphQLObjectType, GraphQLNonNull, GraphQLString, GraphQLList } = require("graphql")

const User = require("../models/user")
const Expense = require("../models/expense")

const CategoryType = new GraphQLObjectType({
  name: "Category",
  description: "Category object that can store expenses.",
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLString) },
    name: {type: GraphQLNonNull(GraphQLString)},
    backgroundUrl: { type: GraphQLString },
    description: {type: GraphQLString},
    createdOn: { type: GraphQLNonNull(GraphQLString) },
    modifiedOn: { type: GraphQLNonNull(GraphQLString) },
    userId: { type: GraphQLNonNull(GraphQLString), resolve: (category) => category.user },
    user: {
      type: UserType,
      resolve: async (category) => await User.findById(category.user)
    },
    expenses: {
      type: GraphQLList(ExpenseType),
      resolve: async (category) => await Expense.find({ category: category.id })
    }

  })
})

module.exports = CategoryType

const UserType = require("../graphQlTypes/UserType")
const ExpenseType = require("./ExpenseType");

