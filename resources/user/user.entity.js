const mongoose = require("mongoose");

const userSchema = {
  uid: { type: String, required: true },
  email: { type: String },
};

module.exports = mongoose.model("users", userSchema);
