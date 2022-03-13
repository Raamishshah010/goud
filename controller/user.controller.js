const User = require("../model/user");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");

const client = require("twilio")(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN,
  {
    lazyLoading: true,
  }
);

const getUsers = async (req, res) => {
  try {
    let users = await User.find().select("-password");

    if (!users) {
      return res.status(400).json({ errors: [{ msg: "No Users" }] });
    }

    res.json(users);
  } catch (error) {
    res.status(500).json({ errors: error });
  }
};

const getUser = async (req, res) => {
  try {
    let userId = req.params.id;
    let user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(400).json({ errors: [{ msg: "No User" }] });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ errors: error });
  }
};

const loginUserWithPhoneNumber = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { phoneNumber } = req.body;
  try {
    let user = await User.findOne({ phoneNumber });

    if (!user) {
      return res.status(400).json({ errors: [{ msg: "User Not exist" }] });
    }

    const payload = {
      user: {
        id: user._id,
        isUser: true,
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
    res.status(500).json({ errors: error });
  }
};

const loginUserWithEmail = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ errors: [{ msg: "User Not exist" }] });
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ errors: [{ msg: "invalid credentials" }] });
    }

    const payload = {
      user: {
        id: user._id,
        isUser: true,
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
    res.status(500).json({ errors: error });
  }
};

const registerUser = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const {
    fullName,
    email,
    phoneNumber,
    gender,
    age,
    country,
    password,
  } = req.body;
  try {
    let user = await User.findOne({ phoneNumber });

    if (user) {
      return res
        .status(400)
        .json({ errors: [{ msg: "Phone number already exist" }] });
    }

    user = new User({
      fullName,
      email,
      phoneNumber,
      gender,
      age,
      country,
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    const payload = {
      user: {
        id: user._id,
        isUser: true,
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
    console.log(error);
    res.status(500).json({ errors: error.message });
  }
};

const sendVerificationCode = async (req, res) => {
  const phoneNumber = req.body.phoneNumber;
  client.verify
    .services(process.env.TWILIO_SERVICE_API_KEY)
    .verifications.create({
      to: phoneNumber,
      channel: "sms",
    })
    .then((reslt) => {
      res.status(200).json({ message: "Sent Code successfully" });
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
};

const verifyVerificationCode = async (req, res) => {
  const phoneNumber = req.body.phoneNumber;
  const code = req.body.code;
  client.verify
    .services(process.env.TWILIO_SERVICE_API_KEY)
    .verificationChecks.create({
      to: phoneNumber,
      code: code,
    })
    .then((reslt) => {
      res.status(200).json({ message: "Verified" });
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
};

module.exports = {
  verifyVerificationCode,
  sendVerificationCode,
  registerUser,
  getUser,
  getUsers,
  loginUserWithEmail,
  loginUserWithPhoneNumber,
};
