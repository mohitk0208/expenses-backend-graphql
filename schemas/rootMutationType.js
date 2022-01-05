const { GraphQLObjectType, GraphQLNonNull, GraphQLString, GraphQLFloat } = require("graphql")

const userResolvers = require("../resolvers/userResolvers")
const categoryResolvers = require("../resolvers/categoryResolvers")
const budgetPlanResolvers = require("../resolvers/budgetPlanResolvers")
const expenseResolvers = require("../resolvers/expenseResolvers")

const RootMutationType = new GraphQLObjectType({
  name: "mutation",
  description: "root mutation",
  fields: () => ({
    updateUser: {
      type: UserType,
      description: "update user profile.",
      args: {
        currentBudgetPlan: { type: GraphQLString }
      },
      resolve: userResolvers.updateUser
    },
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
        perDayAmount: { type: GraphQLNonNull(GraphQLFloat) },
        monthBudget: { type: GraphQLNonNull(GraphQLFloat) }
      },
      resolve: budgetPlanResolvers.addBudgetPlan
    },
    updateBudgetPlan: {
      type: BudgetPlanType,
      description: "change the monthBudget and perDayAmount of a budget plan.",
      args: {
        id: { type: GraphQLNonNull(GraphQLString) },
        perDayAmount: { type: GraphQLFloat },
        monthBudget: { type: GraphQLFloat }
      },
      resolve: budgetPlanResolvers.updateBudgetPlan
    },
    addExpense: {
      type: ExpenseType,
      description: "add a new expense",
      args: {
        date: { type: GraphQLNonNull(GraphQLString) },
        amount: { type: GraphQLNonNull(GraphQLFloat) },
        spentOn: { type: GraphQLString },
        category: { type: GraphQLNonNull(GraphQLString) }
      },
      resolve: expenseResolvers.addExpense
    }
  })
})

module.exports = RootMutationType

// *****************************************************

const CategoryType = require("../graphQlTypes/CategoryType")
const BudgetPlanType = require("../graphQlTypes/BudgetPlanType");
const ExpenseType = require("../graphQlTypes/ExpenseType")
const UserType = require("../graphQlTypes/UserType")

