const { GraphQLObjectType, GraphQLNonNull, GraphQLString, GraphQLList } = require("graphql")

const Category = require("../models/category")
const BudgetPlan = require("../models/budgetPlan")
const Expense = require("../models/expense")
const Month = require("../models/month")

const UserType = new GraphQLObjectType({
  name: "User",
  description: "A user object of expenses app.",
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLString) },
    googleId: { type: GraphQLNonNull(GraphQLString) },
    firstName: { type: GraphQLNonNull(GraphQLString) },
    lastName: { type: GraphQLString },
    photoUrl: { type: GraphQLString },
    createdAt: { type: GraphQLNonNull(GraphQLString) },
    updatedAt: { type: GraphQLNonNull(GraphQLString) },
    currentBudgetPlanId: { type: GraphQLString },
    expenses: {
      type: GraphQLList(ExpenseType),
      resolve: async (user) => await Expense.find({userId: user.id})
    },
    categories: {
      type: GraphQLList(CategoryType),
      resolve: async (user) => await Category.find({ userId: user.id })
    },
    budgetPlans: {
      type: GraphQLList(BudgetPlanType),
      resolve: async (user) => await BudgetPlan.find({ userId: user.id })
    },
    months: {
      type: GraphQLList(MonthType),
      resolve: async (user) => await Month.find({ userId: user.id })
    },
    currentBudgetPlan: {
      type: BudgetPlanType,
      resolve: async (user) => await BudgetPlan.findOne({
        currentBudgetPlan: user.currentBudgetPlanId,
        userId: user.id
      })
    }
  })
})

module.exports = UserType

// ***************************************************

const CategoryType = require("./CategoryType")
const BudgetPlanType = require("./BudgetPlanType");
const ExpenseType = require("./ExpenseType");
const MonthType = require("./MonthType");
