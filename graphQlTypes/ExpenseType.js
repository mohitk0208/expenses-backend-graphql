const { GraphQLObjectType, GraphQLNonNull, GraphQLString, GraphQLFloat } = require("graphql")

const ExpenseType = new GraphQLObjectType({
  name: "Expense",
  description: "a expense object that represents that some money is spent on something.",
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLString) },
    date: { type: GraphQLNonNull(GraphQLString) },
    amount: { type: GraphQLNonNull(GraphQLFloat) },
    // TODO
    // category,
    // month
  })
})

module.exports = ExpenseType