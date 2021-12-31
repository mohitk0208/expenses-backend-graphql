const { GraphQLObjectType, GraphQLNonNull, GraphQLString } = require("graphql")

const userResolvers = require("../resolvers/userResolvers")
const categoryResolvers = require("../resolvers/categoryResolvers")
const budgetPlanResolvers = require("../resolvers/budgetPlanResolvers")
const expenseResolvers = require("../resolvers/expenseResolvers")
const monthResolvers = require("../resolvers/monthResolvers")

const RootQueryType = new GraphQLObjectType({
  name: "query",
  description: "root query",
  fields: () => ({
    user: {
      type: UserType,
      description: "a single user",
      args: {
        id: { type: GraphQLNonNull(GraphQLString) }
      },
      resolve: userResolvers.user
    },
    category: {
      type: CategoryType,
      description: "a single category",
      args: {
        id: { type: GraphQLNonNull(GraphQLString) }
      },
      resolve: categoryResolvers.category
    },
    budgetPlan: {
      type: BudgetPlanType,
      description: "a single budget plan",
      args: {
        id: { type: GraphQLNonNull(GraphQLString) }
      },
      resolve: budgetPlanResolvers.budgetPlan
    },
    month: {
      type: MonthType,
      description: "a single month object",
      args: {
        id: { type: GraphQLNonNull(GraphQLString) }
      },
      resolve: monthResolvers.month
    },
    expense: {
      type: ExpenseType,
      description: "a single expense object",
      args: {
        id: { type: GraphQLNonNull(GraphQLString) }
      },
      resolve: expenseResolvers.expense
    }
  })
})


module.exports = RootQueryType

/*********************************************************/

const UserType = require("../graphQlTypes/UserType")
const CategoryType = require("../graphQlTypes/CategoryType")
const BudgetPlanType = require("../graphQlTypes/BudgetPlanType")
const MonthType = require("../graphQlTypes/MonthType")
const ExpenseType = require("../graphQlTypes/ExpenseType")