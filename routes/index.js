const express = require("express");
const router = express();

const userRoutes = require("./user.routes");
const commentRoutes = require("./comments.routes");
const weekRoutes = require("./week.routes");
const socialFormRoutes = require("./socialForm.routes");
const adminRoutes = require("./admin.routes");
const doctorRoutes = require("./doctor.routes");
const articleRoutes = require("./article.routes");
const categoryRoutes = require("./category.routes");
const pregnancyInfoRoutes = require("./proegnancyInfo.routes");

// User Routes
router.use("/user", userRoutes);
router.use("/admin", adminRoutes);
router.use("/doctor", doctorRoutes);
router.use("/article", articleRoutes);
router.use("/comment", commentRoutes);
router.use("/socialform", socialFormRoutes);
router.use("/category", categoryRoutes);
router.use("/week", weekRoutes);
router.use("/pregnancyinfo", pregnancyInfoRoutes);

module.exports = router;
