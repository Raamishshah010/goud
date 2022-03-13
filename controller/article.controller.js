const Article = require("../model/article");
const { validationResult } = require("express-validator");
const fileHelper = require("../utils/fileHelper");

const getArticles = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const articles = await Article.find().populate("categoryId");

    if (!articles) {
      return res.status(400).json({ errors: [{ msg: "No articles" }] });
    }

    res.json({ msg: "success", data: articles });
  } catch (error) {
    res.status(500).json({ msg: "failed", errors: error.message });
  }
};

const getArticle = async (req, res) => {
  try {
    let articleID = req.params.id;
    let article = await Article.findById(articleID).populate("categoryId");

    if (!article) {
      return res.status(400).json({ errors: [{ msg: "No Article" }] });
    }

    res.json({ msg: "success", data: article });
  } catch (error) {
    res.status(500).json({ msg: "failed", errors: error });
  }
};

const addArticle = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    req.file && fileHelper.deleteFile(req.file.path);
    return res.status(400).json({ errors: errors.array() });
  }

  const {
    title,
    description = null,
    referalLink = null,
    categoryId,
  } = req.body;

  try {
    let article = new Article({
      url: req.file ? req.file.path : null,
      title,
      description,
      referalLink,
      categoryId,
      userId: req.user.id,
    });
    const createdArticle = await article.save();
    res.json({ msg: "success", data: createdArticle });
  } catch (error) {
    res.status(500).json({ msg: "failed", errors: error });
  }
};
const updateArticle = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    req.file && fileHelper.deleteFile(req.file.path);
    return res.status(400).json({ errors: errors.array() });
  }

  const articleId = req.params.id;

  try {
    let article = await Article.findById(articleId);
    if (!article) {
      req.file && fileHelper.deleteFile(req.file.path);
      return res.status(400).json({ errors: [{ msg: "No info wit this id" }] });
    }

    let { url, title, description, referalLink, categoryId } = req.body;

    if (req.file && article.url) {
      fileHelper.deleteFile(article.url);
    }

    if (req.file) {
      url = req.file.path;
    }

    article.title = title;
    article.description = description;
    article.referalLink = referalLink;
    article.categoryId = categoryId;
    article.userId = req.user.id;
    article.url = url;
    const updatedArticle = await article.save();
    res.json({ msg: "success", data: updatedArticle });
  } catch (error) {
    res.status(500).json({ msg: "failed", errors: error });
  }
};

const deleteArticle = async (req, res) => {
  const articleID = req.params.id;
  const imageUrl = req.body.imageUrl;
  try {
    await Article.findByIdAndDelete({ _id: articleID });
    if (imageUrl) {
      fileHelper.deleteFile(imageUrl);
    }
    res.json({ msg: "successfully deleted" });
  } catch (error) {
    res.status(500).json({ msg: "failed", errors: error });
  }
};

module.exports = {
  addArticle,
  getArticle,
  getArticles,
  updateArticle,
  deleteArticle,
};
