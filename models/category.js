const mongoose = require("mongoose")

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  backgroundUrl: { type: String },
  description: { type: String },
  userId: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
}, {
  timestamps: true
})


module.exports = mongoose.model("Category", categorySchema)