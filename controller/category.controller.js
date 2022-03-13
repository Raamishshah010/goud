const Category = require("../model/category");
const { validationResult } = require("express-validator");

const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();

    if (!categories) {
      return res.status(400).json({ errors: [{ msg: "No categories" }] });
    }

    res.json({ msg: "success", data: categories });
  } catch (error) {
    res.status(500).json({ msg: "failed", errors: error });
  }
};

const getCategory = async (req, res) => {
  try {
    let categoryID = req.params.id;
    let category = await Category.findById(categoryID);

    if (!category) {
      return res.status(400).json({ errors: [{ msg: "No category" }] });
    }

    res.json({ msg: "success", data: category });
  } catch (error) {
    res.status(500).json({ msg: "failed", errors: error });
  }
};
const addCategory = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { name } = req.body;
  try {
    let category = new Category({
      name,
    });
    const createdCategory = await category.save();
    res.json({ msg: "success", data: createdCategory });
  } catch (error) {
    res.status(500).json({ msg: "failed", errors: error });
  }
};
const updateCategory = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const categoryId = req.params.id;

  const { name } = req.body;
  try {
    let category = await Category.findById(categoryId);
    if (!category) {
      return res
        .status(400)
        .json({ errors: [{ msg: "No category wit this id" }] });
    }

    category.name = name;

    const updatedCategory = await category.save();

    res.json({ msg: "success", data: updatedCategory });
  } catch (error) {
    res.status(500).json({ msg: "failed", errors: error });
  }
};

const deleteCategory = async (req, res) => {
  const categoryId = req.params.id;
  try {
    await Category.findByIdAndDelete({ _id: categoryId });
    res.json({ msg: "successfully deleted" });
  } catch (error) {
    res.status(500).json({ msg: "failed", errors: error });
  }
};

module.exports = {
  addCategory,
  getCategories,
  getCategory,
  updateCategory,
  deleteCategory,
};
