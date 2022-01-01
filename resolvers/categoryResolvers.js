const Category = require("../models/category")

const category = async (parent, args, context) => {

  const { user } = context

  if (user) {
    const c = await Category.findById(args.id)

    if (c.userId === user) {
      return c
    }
    // throw error when category does no belong to the user
    // that the category is not found
    // or rather dont return the category
  }

  return
}

const categories = async (parent, args, context) => {
  const { user } = context

  if (user) {
    return await Category.find({ user: user.id })
  }

}


exports.category = category
exports.categories = categories