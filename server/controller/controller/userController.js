const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const seedUser = require("../seed/userSeed");
const User = require("../../model/User");

//! Seed User
router.get("/seedUser", seedUser);

const checkUserLogin = (req, res, next) => {
  if (req.session.login !== "user") {
    res.status(401).json({ msg: "Please Login" });
  } else {
    next();
  }
};

//! Login User
router.post("/login", [checkUserLogin], async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username }).exec();
  console.log(user);

  if (user === null) {
    return res.status(401).json({ msg: "User not found" });
  }
  if (!bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ msg: "Invalid password" });
  } else {
    return res.json(user);
  }
});

//! Create New User
router.post("/", async (req, res) => {
  req.body.password = bcrypt.hashSync(req.body.password, 10);
  try {
    const newuser = await User.create(req.body);
    res.status(201).json(newuser);
  } catch (error) {
    res.status(500).json({ error });
  }
});

//! Get User data
router.get("/", async (req, res) => {
  try {
    const user = await User.find().exec();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});

//! Get 1 User data
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id).exec();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});

//! Delete user
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByIdAndDelete(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ error });
  }
});

//! EDIT USER
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error });
  }
});
module.exports = router;
