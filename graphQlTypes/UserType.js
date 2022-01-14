const { GraphQLObjectType, GraphQLNonNull, GraphQLString, GraphQLList } = require("graphql")

const Category = require("../models/category")
const BudgetPlan = require("../models/budgetPlan")
const Expense = require("../models/expense")

const UserType = new GraphQLObjectType({
  name: "User",
  description: "A user object of expenses app.",
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLString) },
    googleId: { type: GraphQLNonNull(GraphQLString) },
    firstName: { type: GraphQLNonNull(GraphQLString) },
    lastName: { type: GraphQLString },
    photoUrl: { type: GraphQLString },
    createdOn: { type: GraphQLNonNull(GraphQLString) },
    modifiedOn: { type: GraphQLNonNull(GraphQLString) },
    currentBudgetPlanId: { type: GraphQLString, resolve: (user) => user.currentBudgetPlan },
    expenses: {
      type: GraphQLList(ExpenseType),
      resolve: async (user) => await Expense.find({user: user.id})
    },
    categories: {
      type: GraphQLList(CategoryType),
      resolve: async (user) => await Category.find({ user: user.id })
    },
    budgetPlans: {
      type: GraphQLList(BudgetPlanType),
      resolve: async (user) => await BudgetPlan.find({ user: user.id })
    },
    months: {
      type: GraphQLList(MonthType),
      resolve: async (user) => await Month.find({ user: user.id })
    },
    currentBudgetPlan: {
      type: BudgetPlanType,
      resolve: async (user) => await BudgetPlan.findOne({
        currentBudgetPlan: user.currentBudgetPlan,
        user: user.id
      })
    }
  })
})

module.exports = UserType

// ***************************************************

const CategoryType = require("./CategoryType")
const BudgetPlanType = require("./BudgetPlanType");
const ExpenseType = require("./ExpenseType");
const onthType = require("./MonthType");
