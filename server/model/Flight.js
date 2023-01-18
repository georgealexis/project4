//! Schema Template
const mongoose = require("mongoose");

const flightSchema = new mongoose.Schema(
  {
    // airport: { type: mongoose.Schema.Types.ObjectId, ref: "Airport" },
    airline: { type: String, required: true },
    callsign: { type: String, minValue: 3, maxValue: 20, required: true },
    pax: { type: Number, maxValue: 8, required: true },
    etd: { type: String, required: true },
    eta: { type: String, required: true },
    location: { type: String, required: true },
    type: { type: String, required: true },
    userid: { type: String },
  },
  { timestamps: true }
);
const Flight = mongoose.model("Flight", flightSchema);

module.exports = Flight;
