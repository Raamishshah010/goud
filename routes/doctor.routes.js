const express = require("express");
const router = express.Router();
const Doctor = require("../model/doctor");

router.get(
  "/",
  async (req, res) => {
    try {
      let doctors = await Doctor.find();

      if (!doctors) {
        return res.status(400).json({  msg: "failed", error: "Doctors not found" });
      }

      res.status(200).json({msg: "success", data: doctors});
    } catch (error) {
      return res.status(400).json({ msg: "failed", error: error.message });
    }
  }
);

module.exports = router;
