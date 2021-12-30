const { GraphQLObjectType, GraphQLNonNull, GraphQLString } = require("graphql")

const userResolvers = require("../resolvers/userResolvers")
const categoryResolvers = require("../resolvers/categoryResolvers")

const RootQueryType = new GraphQLObjectType({
  name: "query",
  description: "root query",
  fields: () => ({
    user: {
      type: UserType,
      description: "a single user",
      args: {
        id: { type: GraphQLNonNull(GraphQLString) }
      },
      resolve: userResolvers.user
    },
    category: {
      type: CategoryType,
      description: "a single category",
      args: {
        id: { type: GraphQLNonNull(GraphQLString)}
      },
      resolve: categoryResolvers.category
    }
  })
})


module.exports = RootQueryType

/*********************************************************/

const UserType = require("../graphQlTypes/UserType")
const CategoryType = require("../graphQlTypes/CategoryType")