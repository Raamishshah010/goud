const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullName: { type: String, default: null },
  email: { type: String, unique: true, required: true },
  phoneNumber: { type: String, required: true },
  gender: { type: String, required: true },
  age: { type: Number, required: true },
  country: { type: String, required: true },
  password: { type: String, required: true },
});

module.exports = mongoose.model("user", userSchema);
