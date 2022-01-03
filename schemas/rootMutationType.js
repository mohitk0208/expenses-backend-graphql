const { GraphQLObjectType, GraphQLNonNull, GraphQLString, GraphQLFloat } = require("graphql")

const categoryResolvers = require("../resolvers/categoryResolvers")
const budgetPlanResolvers = require("../resolvers/budgetPlanResolvers")

const RootMutationType = new GraphQLObjectType({
  name: "mutation",
  description: "root mutation",
  fields: () => ({
    addCategory: {
      type: CategoryType,
      description: "add a new category for the user sending the request.",
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        backgroundUrl: { type: GraphQLString },
      },
      resolve: categoryResolvers.addCategory
    },
    addBudgetPlan: {
      type: BudgetPlanType,
      description: "add a new Budget Plan for the user sending the request.",
      args: {
        perDayAmount: {type: GraphQLNonNull(GraphQLFloat)},
        monthBudget: {type: GraphQLNonNull(GraphQLFloat)}
      },
      resolve: budgetPlanResolvers.addBudgetPlan
    }
  })
})

module.exports = RootMutationType

// *****************************************************

const CategoryType = require("../graphQlTypes/CategoryType")
const BudgetPlanType = require("../graphQlTypes/BudgetPlanType")
