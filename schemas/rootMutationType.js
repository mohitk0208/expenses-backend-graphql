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
        newCurrentBudgetPlanId: { type: GraphQLString }
      },
      resolve: userResolvers.updateUser
    },
    addCategory: {
      type: CategoryType,
      description: "add a new category for the user sending the request.",
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        backgroundUrl: { type: GraphQLString },
        description: { type: GraphQLString },
      },
      resolve: categoryResolvers.addCategory
    },
    updateCategory: {
      type: CategoryType,
      description: "update details of a category",
      args: {
        id: { type: GraphQLNonNull(GraphQLString) },
        name: { type: GraphQLString },
        backgroundUrl: { type: GraphQLString },
        description: { type: GraphQLString },
      },
      resolve: categoryResolvers.updateCategory
    },
    addBudgetPlan: {
      type: BudgetPlanType,
      description: "add a new Budget Plan for the user sending the request.",
      args: {
        perMonthAmount: { type: GraphQLNonNull(GraphQLFloat) },
        perDayAmount: { type: GraphQLNonNull(GraphQLFloat) }
      },
      resolve: budgetPlanResolvers.addBudgetPlan
    },
    updateBudgetPlan: {
      type: BudgetPlanType,
      description: "change the monthBudget and perDayAmount of a budget plan.",
      args: {
        id: { type: GraphQLNonNull(GraphQLString) },
        perMonthAmount: { type: GraphQLFloat },
        perDayAmount: { type: GraphQLFloat }
      },
      resolve: budgetPlanResolvers.updateBudgetPlan
    },
    // deleteBudgetPlan
    addExpense: {
      type: ExpenseType,
      description: "add a new expense",
      args: {
        amount: { type: GraphQLNonNull(GraphQLFloat) },
        dateSpentOn: { type: GraphQLNonNull(GraphQLString) },
        spentFor: { type: GraphQLString },
        type: { type: GraphQLNonNull(GraphQLString) },
        categoryId: { type: GraphQLNonNull(GraphQLString) }
      },
      resolve: expenseResolvers.addExpense
    },
    updateExpense: {
      type: ExpenseType,
      description: "update the details of a expense",
      args: {
        id: { type: GraphQLNonNull(GraphQLString) },
        amount: { type: GraphQLFloat },
        dateSpentOn: { type: GraphQLString },
        spentFor: { type: GraphQLString },
        type: { type: GraphQLString },
        // TODO
        // add functionality to change category
      },
      resolve: expenseResolvers.updateExpense
    }
    // deleteExpense: {}
  })
})

module.exports = RootMutationType

// *****************************************************

const CategoryType = require("../graphQlTypes/CategoryType")
const BudgetPlanType = require("../graphQlTypes/BudgetPlanType");
const ExpenseType = require("../graphQlTypes/ExpenseType")
const UserType = require("../graphQlTypes/UserType")

