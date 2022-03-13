const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  comment: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  postId: { type: mongoose.Schema.Types.ObjectId, ref: "SocialForm" },
  createdDate: { type: Date, default: new Date() },
});

module.exports = mongoose.model("Comment", commentSchema);
