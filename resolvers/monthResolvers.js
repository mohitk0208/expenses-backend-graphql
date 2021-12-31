const Month = require("../models/Month")

const month = (parent, args, context) => {
  const m = Month.findById(args.id)

  // validate with user
  return m
}

exports.month = month