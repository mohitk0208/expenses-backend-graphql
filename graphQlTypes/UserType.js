const { GraphQLObjectType, GraphQLNonNull, GraphQLString, GraphQLList } = require("graphql")
const User = require("../models/user")

const UserType = new GraphQLObjectType({
  name: "User",
  description: "A user object of expenses app.",
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLString) },
    googleId: { type: GraphQLNonNull(GraphQLString) },
    firstName: { type: GraphQLNonNull(GraphQLString) },
    photoUrl: { type: GraphQLString },
    createdAt: { type: GraphQLNonNull(GraphQLString) },
    categories: {
      type: GraphQLList(CategoryType),
      resolve: async (user) => {
        const u = await User.findById(user.id).populate("categories")

        return u.categories;
      }
    },
    budgetPlans: {
      type: GraphQLList(BudgetPlanType),
      resolve: async (user) => await User.findById(user.id).populate("budgetPlans").budgetPlans
    }
  })
})

module.exports = UserType

// ***************************************************

const CategoryType = require("./CategoryType")
const BudgetPlanType = require("./BudgetPlanType")