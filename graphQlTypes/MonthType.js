const { GraphQLObjectType, GraphQLNonNull, GraphQLString, GraphQLInt, GraphQLList } = require("graphql")

const Month = require("../models/Month")

const MonthType = new GraphQLObjectType({
  name: "Month",
  description: "a month specific global data store to store month related constants and data.",
  fields: () => ({
    monthName: { type: GraphQLNonNull(GraphQLString) },
    year: { type: GraphQLNonNull(GraphQLInt) },
    budgetPlan: {
      type: BudgetPlanType,
      resolve: async (month) => {
        const m = await Month.findById(month.id).populate("budgetPlan")

        return m.budgetPlan;
      }
    },
    expenses: {
      type: GraphQLList(ExpenseType),
      resolve: async (month) => await Month.findById(month.id).populate("expenses").expenses
    },
    user: {
      type: UserType,
      resolve: async (month) => await Month.findById(month.id).populate("user").user
    }
  })
})

module.exports = MonthType

// *****************************************************

const BudgetPlanType = require("./BudgetPlanType");
const ExpenseType = require("./ExpenseType");
const UserType = require("./UserType");
