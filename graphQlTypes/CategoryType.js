const { GraphQLObjectType, GraphQLNonNull, GraphQLString } = require("graphql")

const Category = require("../models/category")
const User = require("../models/user")

const CategoryType = new GraphQLObjectType({
  name: "Category",
  description: "Category object that can store expenses.",
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLString) },
    backgroundUrl: { type: GraphQLString },
    userId: { type: GraphQLNonNull(GraphQLString) },
    user: {
      type: UserType,
      resolve: async (category) => await User.findById(category.user)
    }
  })
})

module.exports = CategoryType

const UserType = require("../graphQlTypes/UserType")