const { GraphQLObjectType, GraphQLNonNull, GraphQLString, GraphQLList } = require("graphql")

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
        // id: { type: GraphQLNonNull(GraphQLString) }
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
    categories: {
      type: GraphQLList(CategoryType),
      description: "list of all the categories of the user sending the request.",
      args: {},
      resolve: categoryResolvers.categories

    },
    budgetPlan: {
      type: BudgetPlanType,
      description: "a single budget plan",
      args: {
        id: { type: GraphQLNonNull(GraphQLString) }
      },
      resolve: budgetPlanResolvers.budgetPlan
    },
    budgetPlans: {
      type: GraphQLList(BudgetPlanType),
      description: "a list of all the budget plans of the request sending user.",
      resolve: budgetPlanResolvers.budgetPlans
    },
    month: {
      type: MonthType,
      description: "a single month object",
      args: {
        id: { type: GraphQLNonNull(GraphQLString) }
      },
      resolve: monthResolvers.month
    },
    months: {
      type: GraphQLList(MonthType),
      description: "a list of all the months of the user.",
      resolve: monthResolvers.months
    },
    expense: {
      type: ExpenseType,
      description: "a single expense object",
      args: {
        id: { type: GraphQLNonNull(GraphQLString) }
      },
      resolve: expenseResolvers.expense
    },
    expenses: {
      type: GraphQLList(ExpenseType),
      description: "list of all the expenses of the user.",
      resolve: expenseResolvers.expenses
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