const { GraphQLObjectType } = require("graphql")

const RootQueryType = new GraphQLObjectType({
  name: "query",
  description: "root query",
  fields: () => ({

  })
})


module.exports = RootQueryType

