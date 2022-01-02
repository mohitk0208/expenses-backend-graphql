const { GraphQLObjectType, GraphQLNonNull, GraphQLString } = require("graphql")

const categoryResolvers = require("../resolvers/categoryResolvers")

const RootMutationType = new GraphQLObjectType({
  name: "mutation",
  description: "root mutation",
  fields: () => ({
    addCategory: {
      type: CategoryType,
      description: "add a new category for the user sending the request.",
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        backgroundUrl: { type: GraphQLString },
      },
      resolve: categoryResolvers.addCategory
    }
  })
})

module.exports = RootMutationType

// *****************************************************

const CategoryType = require("../graphQlTypes/CategoryType")