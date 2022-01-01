const { GraphQLObjectType, GraphQLNonNull, GraphQLString, GraphQLList } = require("graphql")

const User = require("../models/user")
const Category = require("../models/category")
const BudgetPlan = require("../models/budgetPlan")

const UserType = new GraphQLObjectType({
  name: "User",
  description: "A user object of expenses app.",
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLString) },
    googleId: { type: GraphQLNonNull(GraphQLString) },
    firstName: { type: GraphQLNonNull(GraphQLString) },
    lastName: {type: GraphQLString},
    photoUrl: { type: GraphQLString },
    createdAt: { type: GraphQLNonNull(GraphQLString) },
    categories: {
      type: GraphQLList(CategoryType),
      resolve: async (user) => await Category.find({ user: user.id })
    },
    budgetPlans: {
      type: GraphQLList(BudgetPlanType),
      resolve: async (user) => await BudgetPlan.find({ user: user.id })
    }
  })
})

module.exports = UserType

// ***************************************************

const CategoryType = require("./CategoryType")
const BudgetPlanType = require("./BudgetPlanType")
