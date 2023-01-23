const express = require("express");
const router = express.Router();
const Restriction = require("../../model/Restriction");

//! Show restriction data
router.get("/:userid", async (req, res) => {
  const { userid } = req.params;
  try {
    const restriction = await Restriction.find({ userid }).exec();
    res.status(200).json(restriction);
  } catch (error) {
    res.status(500).json(error);
  }
});

//! Delete restriction data
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const restriction = await Restriction.findByIdAndDelete(id);
    res.status(200).json(restriction);
  } catch (error) {
    res.status(404).json({ error });
  }
});

//! Create restriction data
router.post("/:userid", async (req, res) => {
  try {
    const restriction = await Restriction.create(req.body);
    res.status(201).json(restriction);
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ error });
  }
});

module.exports = router;
