const Week = require("../model/weekData");
const { validationResult } = require("express-validator");
const fileHelper = require("../utils/fileHelper");

const getWeeks = async (req, res) => {
  try {
    const weeks = await Week.find();

    if (!weeks) {
      return res.status(400).json({ errors: [{ msg: "No weeks" }] });
    }

    res.json({ msg: "success", data: weeks });
  } catch (error) {
    res.status(500).json({ msg: "failed", errors: error.message });
  }
};

const getWeek = async (req, res) => {
  try {
    let weekId = req.params.id;
    let week = await Week.findById(weekId);

    if (!week) {
      return res.status(400).json({ errors: [{ msg: "No week" }] });
    }

    res.json({ msg: "success", data: week });
  } catch (error) {
    res.status(500).json({ msg: "failed", errors: error.message });
  }
};

const addWeek = async (req, res) => {
  const errors = validationResult(req);

  if (!req.file) {
    return res.status(404).json({ errors: "Image is not provide" });
  }

  if (!errors.isEmpty()) {
    req.file && fileHelper.deleteFile(req.file.path);
    return res.status(400).json({ errors: error.messages.array() });
  }

  const { title, description, weekNo, babyLength, babyWeight } = req.body;

  try {
    let week = new Week({
      imageUrl: req.file.path,
      title,
      description,
      weekNo,
      babyLength,
      babyWeight,
    });
    const createdweek = await week.save();
    res.json({ msg: "success", data: createdweek });
  } catch (error) {
    res.status(500).json({ msg: "failed", errors: error.message });
  }
};
const updateWeek = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    req.file && fileHelper.deleteFile(req.file.path);
    return res.status(400).json({ errors: error.messages.array() });
  }

  const weekId = req.params.id;

  try {
    let week = await Week.findById(weekId);
    if (!week) {
      req.file && fileHelper.deleteFile(req.file.path);
      return res.status(400).json({ errors: [{ msg: "No info wit this id" }] });
    }

    let {
      imageUrl,
      title,
      description,
      weekNo,
      babyLength,
      babyWeight,
    } = req.body;

    if (req.file && week.imageUrl) {
      fileHelper.deleteFile(week.imageUrl);
      imageUrl = req.file.path;
    }

    week.title = title;
    week.description = description;
    week.weekNo = weekNo;
    week.babyLength = babyLength;
    week.babyWeight = babyWeight;
    week.imageUrl = imageUrl;
    const updatedweek = await week.save();
    res.json({ msg: "success", data: updatedweek });
  } catch (error) {
    res.status(500).json({ msg: "failed", errors: error.message });
  }
};

const deleteWeek = async (req, res) => {
  const weekID = req.params.id;
  const imageUrl = req.body.imageUrl;
  try {
    await Week.findByIdAndDelete({ _id: weekID });
    fileHelper.deleteFile(imageUrl);
    res.json({ msg: "successfully deleted" });
  } catch (error) {
    res.status(500).json({ msg: "failed", errors: error.message });
  }
};

module.exports = {
  addWeek,
  getWeeks,
  getWeek,
  updateWeek,
  deleteWeek,
};
