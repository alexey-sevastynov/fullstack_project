const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const mongoose = require("mongoose");
const { validationResult } = require("express-validator");

const registerValidator = require("./validation/auth.js");

const User = require("./models/User.js");
const checkAuth = require("./utils/checkAuth.js");

mongoose
  .connect(
    "mongodb+srv://alexseva94:12345@cluster0.fuw8wdu.mongodb.net/blog?retryWrites=true&w=majority"
  )
  .then(() => console.log("database mongoDB atlas: ok!"))
  .catch((err) => console.log("database mongoDB atlas: ERROR!", err));
const PORT = 1313;

const app = express();

app.use(express.json());

app.post("/auth/login", async (req, res) => {
  try {
    // has email login user ?
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isValidPass = await bcrypt.compare(
      req.body.password,
      user._doc.passwordHash
    );

    if (!isValidPass) {
      return res.status(404).json({ message: "wrong login or password" });
    }

    const token = jwt.sign({ _id: user._id }, "secretKey", {
      expiresIn: "30d", // stop 30 day
    });

    const { passwordHash, ...userData } = user._doc;

    res.json({ ...userData, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ massage: "failed to login" });
  }
});

app.post("/auth/register", registerValidator, async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }

    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const doc = new User({
      email: req.body.email,
      fullName: req.body.fullName,
      //password encryption
      passwordHash: hash,
      avatarUrl: req.body.avatarUrl,
    });

    const user = await doc.save();

    const token = jwt.sign({ _id: user._id }, "secretKey", {
      expiresIn: "30d", // stop 30 day
    });

    const { passwordHash, ...userData } = user._doc;

    res.json({ ...userData, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ massage: "failed to register" });
  }
});

app.get("/auth/me", checkAuth, async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ message: "uset not found" });
    }

    const { passwordHash, ...userData } = user._doc;

    res.json(userData);
  } catch (error) {
    console.log(error);
    res.status(500).json({ massage: "Not access!" });
  }
});

// how start the server
app.listen(PORT, (err) => {
  if (err) {
    return console.log(`server ${err}: OK!`);
  } else {
    console.log(`server ${PORT}: OK!`);
  }
});
