const express = require("express");
const { check } = require("express-validator");
const router = express.Router();
const articleController = require("../controller/article.controller");
const auth = require("../Middlewares/auth");
const admin = require("../Middlewares/admin");

router.get("/:id", [auth, admin], articleController.getArticle);
router.get("/", [auth, admin], articleController.getArticles);

router.post(
  "/add",
  [auth, admin],
  [
    check("title", "title is required").not().isEmpty(),
    check("categoryId", "Category is required").not().isEmpty(),
  ],
  articleController.addArticle
);

router.post(
  "/update/:id",
  [auth, admin],
  [
    check("title", "title is required").not().isEmpty(),
    check("categoryId", "Category is required").not().isEmpty(),
  ],
  articleController.updateArticle
);

router.delete("/delete/:id", [auth, admin], articleController.deleteArticle);

module.exports = router;
