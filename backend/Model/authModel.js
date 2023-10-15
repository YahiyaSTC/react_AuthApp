const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  username: { type: String },
  email: { type: String, unique: true },
  password: { type: String },
});



module.exports = mongoose.model("authUser", userSchema);