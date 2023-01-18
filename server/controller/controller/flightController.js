const express = require("express");
const router = express.Router();
const Flight = require("../../model/Flight");
const seedFlight = require("../seed/flightSeed");

//! Seed Flight
router.get("/seedFlight", seedFlight);

//! Show flight data
router.get("/:userid", async (req, res) => {
  const { userid } = req.params;
  try {
    const flight = await Flight.find({ userid }).exec();
    res.status(200).json(flight);
  } catch (error) {
    res.status(500).json(error);
  }
});

//! Delete flight data
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const flight = await Flight.findByIdAndDelete(id);
    res.status(200).json(flight);
  } catch (error) {
    res.status(404).json({ error });
  }
});

//! Create flight data
router.post("/:userid", async (req, res) => {
  try {
    const flight = await Flight.create(req.body);
    res.status(201).json(flight);
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ error });
  }
});

//! Get specific flight data (edit)
router.get("/user/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const flight = await Flight.findById(id).exec();
    res.status(200).json(flight);
  } catch (error) {
    res.status(500).json(error);
  }
});

//! Update flight data
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const booking = await Flight.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(booking);
  } catch (error) {
    res.status(500).json({ error });
  }
});

module.exports = router;
