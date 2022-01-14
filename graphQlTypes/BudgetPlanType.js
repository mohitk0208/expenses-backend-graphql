const { GraphQLObjectType, GraphQLNonNull, GraphQLString, GraphQLFloat } = require("graphql")

const User = require("../models/user")

const BudgetPlanType = new GraphQLObjectType({
  name: "BudgetPlan",
  description: "plans to be applied to each month so see the calender according to the budget plan.",
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLString) },
    perDayAmount: { type: GraphQLNonNull(GraphQLFloat) },
    perMonthAmount: { type: GraphQLNonNull(GraphQLFloat) },
    createdAt: { type: GraphQLNonNull(GraphQLString) },
    updatedAt: { type: GraphQLNonNull(GraphQLString) },
    userId: { type: GraphQLNonNull(GraphQLString)},
    user: {
      type: UserType,
      resolve: async (budgetPlan) => await User.findById(budgetPlan.userId)
    }
  })
})

module.exports = BudgetPlanType

// *****************************************

const UserType = require("./UserType")