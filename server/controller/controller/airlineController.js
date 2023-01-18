const express = require("express");
const router = express.Router();
const Airline = require("../../model/Airline");

//! SHOW AIRLINE
router.get("/", async (req, res) => {
  try {
    const airline = await Airline.find().exec();
    res.status(200).json(airline);
  } catch (error) {
    res.status(500).json(error);
  }
});

//! SHOW 1 AIRLINE
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const airline = await Airline.findById(id).exec();
    res.status(200).json(airline);
  } catch (error) {
    res.status(500).json(error);
  }
});

//! CREATE AIRLINE
router.post("/", async (req, res) => {
  try {
    const airline = await Airline.create(req.body);
    res.status(201).json(airline);
  } catch (error) {
    res.status(500).json({ error });
  }
});

//! DELETE AIRLINE
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const airline = await Airline.findByIdAndDelete(id);
    res.status(200).json(airline);
  } catch (error) {
    res.status(404).json({ error });
  }
});

//! EDIT AIRLINE
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const airline = await Airline.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(airline);
  } catch (error) {
    res.status(500).json({ error });
  }
});
module.exports = router;
