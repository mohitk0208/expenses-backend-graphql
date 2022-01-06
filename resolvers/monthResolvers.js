const Month = require("../models/Month")


const month = async (parent, args, context) => await Month.findOne({ id: args.id, user: context.user.id })


const months = async (parent, args, context) => await Month.find({ user: context.user.id })


exports.month = month
exports.months = months