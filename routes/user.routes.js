const express = require("express");
const router = express.Router();
const User = require("../model/user");
const userController = require("../controller/user.controller");
const { check } = require("express-validator");

router.get("/", userController.getUsers);
router.get("/:id", userController.getUser);

router.post("/sendcode", userController.sendVerificationCode);
router.post("/verify", userController.verifyVerificationCode);
router.post(
  "/register",
  [
    check("fullName").not().isEmpty(),
    check("email", "email is not valid")
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then((userDoc) => {
          if (userDoc) {
            return Promise.reject(
              "E-Mail exists already, please pick a different one."
            );
          }
        });
      })
      .isEmail()
      .normalizeEmail(),
    check("phoneNumber").not().isEmpty(),
    check("gender").not().isEmpty(),
    check("age").isNumeric(),
    check("country").not().isEmpty(),
  ],
  userController.registerUser
);
router.post(
  "/loginwithphone",
  [check("phoneNumber").not().isEmpty()],
  userController.loginUserWithPhoneNumber
);
router.post(
  "/loginwithemail",
  [check("email").not().isEmpty(), check("password").not().isEmpty()],
  userController.loginUserWithEmail
);

module.exports = router;
