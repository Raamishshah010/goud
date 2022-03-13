const mongoose = require("mongoose");

const pregnancySchema = new mongoose.Schema({
  isBefore: { type: Boolean, default: false },
  noOfChild: { type: Number },
  pregnancyWeek: { type: mongoose.Schema.Types.ObjectId, ref: "Week" },
  lastPeriodDate: { type: Date, default: new Date() },
  lastMenstrualPeriod: { type: Date, default: new Date() },
  deliveryDate: { type: Date, default: new Date() },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
});

module.exports = mongoose.model("Pregnancy", pregnancySchema);
