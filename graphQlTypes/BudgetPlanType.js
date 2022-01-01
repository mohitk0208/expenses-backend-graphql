const { GraphQLObjectType, GraphQLNonNull, GraphQLString, GraphQLFloat } = require("graphql")

const BudgetPlan = require("../models/budgetPlan")

const BudgetPlanType = new GraphQLObjectType({
  name: "BudgetPlan",
  description: "plans to be applied to each month so see the calender according to the budget plan.",
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLString) },
    perDayAmount: { type: GraphQLNonNull(GraphQLFloat) },
    monthBudget: { type: GraphQLNonNull(GraphQLFloat) },
    user: {
      type: UserType,
      resolve: async (budgetPlan) => await BudgetPlan.findById(budgetPlan.id).populate("user").user
    }
  })
})

module.exports = BudgetPlanType

// *****************************************

const UserType = require("./UserType")