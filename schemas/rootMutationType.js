const { GraphQLObjectType } = require("graphql")

const RootMutationType = new GraphQLObjectType({
  name: "mutation",
  description: "root mutation",
  fields: () => ({

  })
})

module.exports = RootMutationType