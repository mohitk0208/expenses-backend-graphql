const Month = require("../models/month")


const month = async (parent, args, context) => await Month.findOne({ id: args.id, userId: context.user.id })


const months = async (parent, args, context) => await Month.find({ userId: context.user.id })


exports.month = month
exports.months = months