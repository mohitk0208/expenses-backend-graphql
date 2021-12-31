const mongoose = require("mongoose")

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  backgroundUrl: {type: String},
  user: {type: mongoose.Types.ObjectId, required: true, ref: "User"}
})


module.exports = mongoose.model("Category", categorySchema)