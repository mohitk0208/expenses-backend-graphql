const mongoose = require("mongoose")

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  backgroundUrl: { type: String },
  description: { type: String },
  createdOn: { type: Date, default: Date.now() },
  modifiedOn: { type: Date, default: Date.now() },
  user: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
})


module.exports = mongoose.model("Category", categorySchema)