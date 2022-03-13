const PregnancyInfo = require("../model/pregnancyInfo");
const { validationResult } = require("express-validator");

const getInfos = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const infos = await PregnancyInfo.find().populate("pregnancyWeek");

    if (!infos) {
      return res.status(400).json({ errors: [{ msg: "No infos" }] });
    }

    res.json({ msg: "success", data: infos });
  } catch (error) {
    res.status(500).json({ msg: "failed", errors: error });
  }
};

const getInfo = async (req, res) => {
  try {
    let infoID = req.params.id;
    let info = await PregnancyInfo.findById(infoID).populate("pregnancyWeek");

    if (!info) {
      return res.status(400).json({ errors: [{ msg: "No info" }] });
    }

    res.json({ msg: "success", data: info });
  } catch (error) {
    res.status(500).json({ msg: "failed", errors: error });
  }
};
const addInfo = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const {
    isBefore,
    lastMenstrualPeriod,
    deliveryDate,
    lastPeriodDate,
    pregnancyWeek,
    noOfChild,
  } = req.body;
  try {
    let pregnancyInfo = new PregnancyInfo({
      isBefore,
      lastMenstrualPeriod,
      deliveryDate,
      lastPeriodDate,
      pregnancyWeek,
      noOfChild,
      userId: req.user.id,
    });
    const createdInfo = await pregnancyInfo.save();
    res.json({ msg: "success", data: createdInfo });
  } catch (error) {
    res.status(500).json({ msg: "failed", errors: error });
  }
};
const updateInfo = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const infoId = req.params.id;

  const {
    isBefore,
    lastMenstrualPeriod,
    deliveryDate,
    lastPeriodDate,
    pregnancyWeek,
    noOfChild,
  } = req.body;
  try {
    let info = await PregnancyInfo.findById(infoId);
    if (!info) {
      return res.status(400).json({ errors: [{ msg: "No info wit this id" }] });
    }

    info.isBefore = isBefore;
    info.lastMenstrualPeriod = lastMenstrualPeriod;
    info.deliveryDate = deliveryDate;
    info.lastPeriodDate = lastPeriodDate;
    info.pregnancyWeek = pregnancyWeek;
    info.noOfChild = noOfChild;
    info.userId = req.user.id;

    const updatedInfo = await info.save();

    res.json({ msg: "success", data: updatedInfo });
  } catch (error) {
    res.status(500).json({ msg: "failed", errors: error });
  }
};

module.exports = {
  addInfo,
  getInfo,
  getInfos,
  updateInfo,
};
