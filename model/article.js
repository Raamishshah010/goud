const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema({
  url: { type: String, default: null },
  title: { type: String, required: true },
  description: { type: String, default: null },
  referalLink: { type: String, default: null },
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  createDate: { type: String, default: new Date() },
});

module.exports = mongoose.model("article", articleSchema);
