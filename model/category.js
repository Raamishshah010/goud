const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  createdDate: { type: Date, default: new Date() },
});

module.exports = mongoose.model("Category", categorySchema);
