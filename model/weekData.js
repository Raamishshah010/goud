const mongoose = require("mongoose");

const weekSchema = new mongoose.Schema({
  title: { type: String, default: null },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  weekNo: { type: Number, required: true },
  babyLength: { type: String, required: true },
  babyWeight: { type: String, required: true },
});

module.exports = mongoose.model("Week", weekSchema);
