const mongoose = require("mongoose")

const Category = require("../models/category")
const User = require("../models/user")

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


const categories = async (parent, args, context) => await Category.find({user: context.user.id})



const addCategory = async (parent, args, context) => {

  const user = await User.findById(context.user.id)

  const newCategory = new Category({
    name: args.name,
    backgroundUrl: args.backgroundUrl,
    user: user,
  })

  await newCategory.save()

  return newCategory;
}




const updateCategory = async (parent, args, context) => {

  let category = await Category.findOne({ id: args.id, user: context.user.id })

  if (!category) {
    // TODO
    // raise and error that category not found
  }

  if (args.name) category.name = args.name
  if (args.backgroundUrl) category.backgroundUrl = args.backgroundUrl

  await category.save()

  return category

}


exports.category = category
exports.categories = categories
exports.addCategory = addCategory
exports.updateCategory = updateCategory