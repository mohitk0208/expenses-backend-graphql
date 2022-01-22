const Month = require("../models/month")


const month = async (parent, args, context) => await Month.findOne({ _id: args.id, userId: context.user.id })

const monthByMonthNumAndYear = async (parent, args, context) => await Month.findOne({ monthNum: args.monthNum, year: args.year, userId: context.user.id })


const months = async (parent, args, context) => await Month.find({ userId: context.user.id })


exports.month = month
exports.months = months
exports.monthByMonthNumAndYear = monthByMonthNumAndYear