const User = require("../models/user")

const user = async (parent, args, context) => {
  return context.user
}

exports.user = user