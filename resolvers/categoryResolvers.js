const Category = require("../models/category")
const User = require("../models/user")

const category = async (parent, args, context) => await Category.findOne({ id: args.id, userId: context.user.id })


const categories = async (parent, args, context) => await Category.find({ userId: context.user.id })



const addCategory = async (parent, args, context) => {

  const user = await User.findById(context.user.id)

  const newCategory = new Category({
    name: args.name,
    backgroundUrl: args.backgroundUrl,
    description: args.description,
    userId: user,
  })

  await newCategory.save()

  return newCategory;
}




const updateCategory = async (parent, args, context) => {

  let category = await Category.findOne({ id: args.id, userId: context.user.id })

  if (!category) {
    // TODO
    // raise and error that category not found
  }

  if (args.name) category.name = args.name
  if (args.backgroundUrl) category.backgroundUrl = args.backgroundUrl
  if (args.description) category.description = args.description

  await category.save()

  return category

}


exports.category = category
exports.categories = categories
exports.addCategory = addCategory
exports.updateCategory = updateCategory