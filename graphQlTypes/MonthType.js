const { GraphQLObjectType, GraphQLNonNull, GraphQLString, GraphQLInt } = require("graphql")

const MonthType = new GraphQLObjectType({
  name: "Month",
  description: "a month specific global data store to store month related constants and data.",
  fields: () => ({
    monthName: { type: GraphQLNonNull(GraphQLString) },
    year: { type: GraphQLNonNull(GraphQLInt) },
    /**
     * TODO
     * budgetPlan
     * expenses
     *
     */
  })
})

module.exports = MonthType