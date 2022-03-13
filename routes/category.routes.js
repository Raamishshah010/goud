const express = require("express");
const { check } = require("express-validator");
const router = express.Router();
const categoryController = require("../controller/category.controller");
const auth = require("../Middlewares/auth");

router.get("/", [auth], categoryController.getCategories);
router.get("/:id", [auth], categoryController.getCategory);

router.post(
  "/add",
  [auth],
  [check("name").not().isEmpty()],
  categoryController.addCategory
);

router.post(
  "/update/:id",
  [auth],
  [check("name").not().isEmpty()],
  categoryController.updateCategory
);

router.delete("/delete/:id", [auth], categoryController.deleteCategory);

module.exports = router;
