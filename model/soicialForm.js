const mongoose = require("mongoose");

const SocialFormSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true  },
  weekId: {type: mongoose.Schema.Types.ObjectId, ref: "Week" },
  imageUrl: { type: String, default: null },
  likes: [],
  likescounter: { type: Number, default: 0 },
  commentsCounter: { type: Number, default: 0 },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  uploadingTime: { type: Date, default: new Date() },
});

module.exports = mongoose.model("SocialForm", SocialFormSchema);
