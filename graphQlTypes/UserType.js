const { GraphQLObjectType, GraphQLNonNull, GraphQLString } = require("graphql")
const User = require("../models/user")

const UserType = new GraphQLObjectType({
  name: "User",
  description: "A user object of expenses app.",
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLString) },
    googleId: { type: GraphQLNonNull(GraphQLString) },
    firstName: { type: GraphQLNonNull(GraphQLString) },
    photoUrl: { type: GraphQLString },
    createdAt: { type: GraphQLNonNull(GraphQLString) }
    // TODO implement for the list of categories
    // categories
  })
})

module.exports = UserType