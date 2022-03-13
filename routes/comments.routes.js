const express = require("express");
const { check } = require("express-validator");
const router = express.Router();
const commentController = require("../controller/comment.controller");
const auth = require("../Middlewares/auth");

router.get("/", [auth], commentController.getComments);
router.get("/:id", [auth], commentController.getComment);
router.get("/post/:postId", [auth], commentController.getCommentByPost);

router.post(
  "/add",
  [auth],
  [check("comment").not().isEmpty(), check("postId").not().isEmpty()],
  commentController.addComment
);

router.post(
  "/update/:id",
  [auth],
  [check("comment").not().isEmpty(), check("postId").not().isEmpty()],
  commentController.updateComment
);

router.delete(
  "/delete/:id",
  [auth],
  [check("postId").not().isEmpty()],
  commentController.deleteComment
);

module.exports = router;
