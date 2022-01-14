const mongoose = require("mongoose")
const uniqueValidator = require("mongoose-unique-validator")

const userSchema = new mongoose.Schema({
  googleId: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String },
  photoUrl: { type: String },
  createdOn: { type: mongoose.Schema.Types.Date, default: Date.now() },
  modifiedOn: { type: mongoose.Schema.Types.Date, default: Date.now() },
  currentBudgetPlan: { type: mongoose.Types.ObjectId, ref: "BudgetPlan" }
})

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema)