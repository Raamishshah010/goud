const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  qualification: { type: String, required: true },
  rating: { type: Number, required: true },
  lat: { type: Number, required: true },
  lang: { type: Number, required: true },
  createdDate: { type: Date, default: new Date() },
});

module.exports = mongoose.model("Doctor", doctorSchema);
