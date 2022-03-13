const SocialForm = require("../model/soicialForm");
const { validationResult } = require("express-validator");
const fileHelper = require("../utils/fileHelper");

const getSocialForms = async (req, res) => {
  try {
    const socialForms = await SocialForm.find();

    if (!socialForms) {
      return res.status(400).json({ errors: [{ msg: "No socialForms" }] });
    }

    res.json({ msg: "success", data: socialForms });
  } catch (error) {
    res.status(500).json({ msg: "failed", errors: error });
  }
};

const getSocialForm = async (req, res) => {
  try {
    let socialFormId = req.params.id;
    let socialForm = await SocialForm.findById(socialFormId);

    if (!socialForm) {
      return res.status(400).json({ errors: [{ msg: "No socialForm" }] });
    }

    res.json({ msg: "success", data: socialForm });
  } catch (error) {
    res.status(500).json({ msg: "failed", errors: error });
  }
};

const addSocialForm = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    req.file && fileHelper.deleteFile(req.file.path);
    return res.status(400).json({ errors: errors.array() });
  }

  if (!req.file) {
    return res.status(400).json({ errors: "Image is not provides" });
  }

  const { title, description, weekId } = req.body;

  try {
    let socialForm = new SocialForm({
      imageUrl: req.file.path,
      title,
      description,
      weekId,
      userId: req.user.id,
    });
    const createdsocialForm = await socialForm.save();
    res.json({ msg: "success", data: createdsocialForm });
  } catch (error) {
    res.status(500).json({ msg: "failed", errors: error });
  }
};

const updateSocialForm = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    req.file && fileHelper.deleteFile(req.file.path);
    return res.status(400).json({ errors: errors.array() });
  }

  const socialFormId = req.params.id;

  let {
    title,
    description,
    imageUrl,
    likes,
    weekId,
    likesCounter,
    commentsCounter,
  } = req.body;
  try {
    let socialForm = await SocialForm.findById(socialFormId);
    if (!socialForm) {
      req.file && fileHelper.deleteFile(req.file.path);
      return res
        .status(400)
        .json({ errors: [{ msg: "No socialForm with this id" }] });
    }

    if (req.file && socialForm.imageUrl) {
      fileHelper.deleteFile(socialForm.imageUrl);
      imageUrl = req.file.path;
    }

    socialForm.title = title;
    socialForm.description = description;
    socialForm.likes = JSON.parse(likes);
    socialForm.likesCounter = likesCounter;
    socialForm.commentsCounter = commentsCounter;
    socialForm.imageUrl = imageUrl;
    socialForm.weekId = weekId;

    const updatedData = await socialForm.save();

    res.json({ msg: "success", data: updatedData });
  } catch (error) {
    res.status(500).json({ msg: "failed", errors: error.message });
  }
};

const deleteSocialForm = async (req, res) => {
  const formId = req.params.id;
  const imageUrl = req.body.imageUrl;

  try {
    await SocialForm.findByIdAndDelete({ _id: formId });

    if (imageUrl) {
      fileHelper.deleteFile(imageUrl);
    }

    res.status(200).json({ message: "Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ errors: error.message });
  }
};

const addLikeOrRemove = async (req, res) => {
  const formId = req.params.id;
  const likerId = req.body.likerId;

  try {
    const socialForm = await SocialForm.findById(formId);

    if (!socialForm) {
      return res
        .status(400)
        .json({ errors: [{ msg: "No socialForm with this id" }] });
    }

    let totalLikes = [...socialForm.likes];
    const index = totalLikes.findIndex((like) => like === likerId);

    if (index >= 0) {
      totalLikes = totalLikes.filter((like) => like !== likerId);
      socialForm.likescounter = socialForm.likescounter - 1;
    } else {
      totalLikes.push(likerId);
      socialForm.likescounter = socialForm.likescounter + 1;
    }

    socialForm.likes = totalLikes;
    const updatedForm = await socialForm.save();
    res.status(200).json({ message: "success", data: updatedForm });
  } catch (error) {
    res.status(500).json({ errors: error.message });
  }
};

module.exports = {
  addSocialForm,
  getSocialForms,
  getSocialForm,
  updateSocialForm,
  deleteSocialForm,
  addLikeOrRemove,
};
