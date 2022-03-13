const express = require("express");
const { check } = require("express-validator");
const router = express.Router();
const pregnancyController = require("../controller/pregnancyInfo.controller");
const auth = require("../Middlewares/auth");
const admin = require("../Middlewares/admin");

router.get("/", [auth], pregnancyController.getInfos);
router.get("/:id", [auth], pregnancyController.getInfo);

router.post(
  "/add",
  [auth, admin],
  [
    check("noOfChild", "Number Of Child is required").isNumeric(),
    check("pregnancyWeek", "pregnancy Week is required").not().isEmpty(),
    check("isBefore", "Is Before is required").isBoolean(),
    check("lastPeriodDate", "Last Period Date is required").not().isEmpty(),
    check("lastMenstrualPeriod", "Last Menstrual Period Date is required")
      .not()
      .isEmpty(),
    check("deliveryDate", "Delivery Date is required").not().isEmpty(),
  ],
  pregnancyController.addInfo
);

router.post(
  "/update/:id",
  [auth, admin],
  [
    check("noOfChild", "Number Of Child is required").isNumeric(),
    check("pregnancyWeek", "pregnancy Week is required").not().isEmpty(),
    check("isBefore", "Is Before is required").isBoolean(),
    check("lastPeriodDate", "Last Period Date is required").not().isEmpty(),
    check("lastMenstrualPeriod", "Last Menstrual Period Date is required")
      .not()
      .isEmpty(),
    check("deliveryDate", "Delivery Date is required").not().isEmpty(),
  ],
  pregnancyController.updateInfo
);

module.exports = router;
