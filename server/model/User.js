//! Schema Template
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, minValue: 3, maxValue: 20, required: true },
    callsign: { type: String, minValue: 3, maxValue: 20, required: true },
    username: { type: String, unique: true, minValue: 3, required: true },
    password: { type: String, minValue: 6, required: true },
    airline: { type: mongoose.Schema.Types.ObjectId, ref: "Airline" },
  },
  { timestamps: true }
);
const User = mongoose.model("User", userSchema);

module.exports = User;
