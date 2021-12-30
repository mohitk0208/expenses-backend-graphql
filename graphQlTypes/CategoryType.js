const { GraphQLObjectType, GraphQLNonNull, GraphQLString } = require("graphql")
const Category = require("../models/category")

const CategoryType = new GraphQLObjectType({
  name: "Category",
  description: "Category object that can store expenses.",
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLString) },
    backgroundUrl: { type: GraphQLString },
    userId: { type: GraphQLNonNull(GraphQLString) },
    user: {
      type: UserType,
      resolve: async (category) => {
        const user = await Category.findById(category.id).populate("userId").userId

        return user
      }
    }
  })
})

module.exports = CategoryType

const UserType = require("../graphQlTypes/UserType")