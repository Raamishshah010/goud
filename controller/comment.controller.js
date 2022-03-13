const Comment = require("../model/comment");
const SocialForm = require("../model/soicialForm");
const { validationResult } = require("express-validator");

const getComments = async (req, res) => {
  try {
    const comments = await Comment.find().populate("postId");

    if (!comments) {
      return res.status(400).json({ errors: [{ msg: "No comments" }] });
    }

    res.json({ msg: "success", data: comments });
  } catch (error) {
    res.status(500).json({ msg: "failed", errors: error });
  }
};

const getComment = async (req, res) => {
  try {
    let commentId = req.params.id;
    let comment = await Comment.findById(commentId).populate("postId");

    if (!comment) {
      return res.status(400).json({ errors: [{ msg: "No comment" }] });
    }

    res.json({ msg: "success", data: comment });
  } catch (error) {
    res.status(500).json({ msg: "failed", errors: error });
  }
};

const getCommentByPost = async (req, res) => {
  try {
    let postId = req.params.postId;

    let comments = await Comment.find({ postId: postId });

    if (!comments) {
      return res.status(400).json({ errors: [{ msg: "No comments" }] });
    }

    res.json({ msg: "success", data: comments });
  } catch (error) {
    res.status(500).json({ msg: "failed", errors: error });
  }
};

const addComment = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { comment, postId } = req.body;
  try {
    let post = await SocialForm.findById(postId);
    if (!post) {
      return res
        .status(400)
        .json({ errors: "Post not found ofor this post id" });
    }
    let commentData = new Comment({
      comment,
      postId,
      userId: req.user.id,
    });
    post.commentsCounter = post.commentsCounter + 1;
    await post.save();
    const createdcomment = await commentData.save();
    res.json({ msg: "success", data: createdcomment });
  } catch (error) {
    res.status(500).json({ msg: "failed", errors: error });
  }
};

const updateComment = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const commentId = req.params.id;

  const { comment, postId } = req.body;
  try {
    let data = await Comment.findById(commentId);
    if (!data) {
      return res
        .status(400)
        .json({ errors: [{ msg: "No comment with this id" }] });
    }

    data.comment = comment;
    data.postId = postId;

    const updatedcomment = await data.save();

    res.json({ msg: "success", data: updatedcomment });
  } catch (error) {
    res.status(500).json({ msg: "failed", errors: error });
  }
};

const deleteComment = async (req, res) => {
  const cId = req.params.id;
  const postId = req.body.postId;
  try {
    const post = await SocialForm.findById(postId);

    if (!post) {
      return res
        .status(400)
        .json({ errors: [{ msg: "No Post with this id" }] });
    }
    post.commentsCounter = post.commentsCounter - 1;

    await Comment.findByIdAndDelete({ _id: cId });
    await post.save();

    res.json({ msg: "successfully deleted" });
  } catch (error) {
    res.status(500).json({ msg: "failed", errors: error });
  }
};

module.exports = {
  addComment,
  getComment,
  getComments,
  updateComment,
  deleteComment,
  getCommentByPost,
};
