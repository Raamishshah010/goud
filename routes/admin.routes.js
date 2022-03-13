const express = require("express");
const router = express.Router();
const Admin = require("../model/Admin");
const jwt = require("jsonwebtoken");

const { check, validationResult } = require("express-validator");

router.post(
  "/login",
  [check("email").not().isEmpty(), check("password").not().isEmpty()],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let admin = await Admin.findOne({ email });

      if (!admin || admin.password !== password) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid Credentials" }] });
      }

      const payload = {
        user: {
          id: admin._id,
          isUser: false,
          isAdmin: true,
        },
      };

      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: 3600 },
        (err, token) => {
          if (err) throw err;

          res.json({ token });
        }
      );
    } catch (error) {
      return res.status(400).json({ errors: [{ msg: error.message }] });
    }
  }
);

module.exports = router;
