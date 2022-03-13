const express = require("express");
const { check } = require("express-validator");
const router = express.Router();
const socialFormController = require("../controller/socialForm.controller");
const auth = require("../Middlewares/auth");

router.get("/", [auth], socialFormController.getSocialForms);
router.get("/:id", [auth], socialFormController.getSocialForm);

router.post(
  "/add",
  [auth],
  [
    check("title", "Title is required").not().isEmpty(),
    check("description", "Description is required").not().isEmpty(),
    check("weekId", "weekId is required").not().isEmpty(),
  ],
  socialFormController.addSocialForm
);

router.post(
  "/update/:id",
  [auth],
  [
    check("title", "Title is required").not().isEmpty(),
    check("description", "Description is required").not().isEmpty(),
    check("weekId", "weekId is required").not().isEmpty(),
    check("imageUrl", "Image Url is required").not().isEmpty(),
    check("likesCounter", "Likes Counter is required").isNumeric(),
    check("commentsCounter", "Comments Counter is required").isNumeric(),
    check("likes", "Likes is required").not().isEmpty(),
  ],
  socialFormController.updateSocialForm
);

router.delete("/delete/:id", [auth], socialFormController.deleteSocialForm);

router.post(
  "/like/addorremove/:id",
  [auth],
  [check("likerId", "User Id Who like it is required").not().isEmpty()],
  socialFormController.addLikeOrRemove
);

module.exports = router;
