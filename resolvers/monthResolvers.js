const Month = require("../models/Month")

const month = async (parent, args, context) => {
  const m = await Month.findById(args.id)

  // validate with user
  return m
}

const months = async (parent, args, context) => {

  const m = await Month.find({user: context.user.id})

  return m
}

exports.month = month
exports.months = months