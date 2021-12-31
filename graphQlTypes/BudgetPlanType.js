const { GraphQLObjectType, GraphQLNonNull, GraphQLString, GraphQLFloat } = require("graphql")

const BudgetPlanType = new GraphQLObjectType({
  name: "BudgetPlan",
  description: "plans to be applied to each month so see the calender according to the budget plan.",
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLString) },
    perDayAmount: { type: GraphQLNonNull(GraphQLFloat) },
    monthBudget: { type: GraphQLNonNull(GraphQLFloat) }
  })
})

module.exports = BudgetPlanType