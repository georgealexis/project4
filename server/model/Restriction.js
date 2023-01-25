//! Schema Template
const mongoose = require("mongoose");

const restrictionSchema = new mongoose.Schema(
  {
    userid: { type: String },
    name: { type: String, required: true },
    start: { type: String, required: true },
    end: { type: String, required: true },
  },
  { timestamps: true }
);
const Restriction = mongoose.model("Restriction", restrictionSchema);

module.exports = Restriction;
