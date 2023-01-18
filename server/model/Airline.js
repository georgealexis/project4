//! Schema Template
const mongoose = require("mongoose");

const airlineSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
  },

  { timestamps: true }
);
const Airline = mongoose.model("Airline", airlineSchema);

module.exports = Airline;
