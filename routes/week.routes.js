const express = require("express");
const router = express.Router();
const weekController = require("../controller/week.controller");
const { check } = require("express-validator");
const auth = require("../Middlewares/auth");
const admin = require("../Middlewares/admin");

router.get("/", [auth, admin], weekController.getWeeks);
router.get("/:id", weekController.getWeek);

router.post(
  "/add",
  [auth, admin],
  [
    check("title").not().isEmpty(),
    check("description").not().isEmpty(),
    check("weekNo").isNumeric(),
    check("babyLength").not().isEmpty(),
    check("babyWeight").not().isEmpty(),
  ],
  weekController.addWeek
);

router.post(
  "/update/:id",
  [auth, admin],
  [
    check("title").not().isEmpty(),
    check("description").not().isEmpty(),
    check("weekNo").isNumeric(),
    check("babyLength").not().isEmpty(),
    check("babyWeight").not().isEmpty(),
  ],
  weekController.updateWeek
);

router.delete(
  "/delete/:id",
  [auth, admin],
  [check("imageUrl").not().isEmpty()],
  weekController.deleteWeek
);

module.exports = router;
