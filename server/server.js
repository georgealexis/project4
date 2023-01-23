//! IMPORT
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const path = require("path");
const session = require("express-session");
const userController = require("../server/controller/controller/userController");
const sessionController = require("../server/controller/controller/sessionController");
const flightController = require("../server/controller/controller/flightController");
const airlineController = require("../server/controller/controller/airlineController");
const restrictionController = require("../server/controller/controller/restrictionController");

//! CONFIGURATION AND CONNECTION
const app = express();
const PORT = process.env.PORT ?? 3000;
const MONGO_URI = process.env.MONGO_URI;

console.log("Mongo_URI", MONGO_URI);
mongoose.set("strictQuery", false);
mongoose.set("runValidators", true);
mongoose.set("debug", true);
mongoose.connect(MONGO_URI);

//! MIDDLEWARE
app.use(morgan("dev"));
app.use(express.json());
app.use(express.static("../client/dist"));

//! SESSION;
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    // cookie: { secure: true },
  })
);

//! ROUTES
app.use("/api/user", userController);
app.use("/api/session", sessionController);
app.use("/api/flight", flightController);
app.use("/api/airline", airlineController);
app.use("/api/restriction", restrictionController);

//! TESTING
app.get("/api/", (req, res) => {
  res.json({ msg: "Flypro Test" });
});

//! SAFETY NET
app.get("*", (req, res) =>
  res.sendFile(path.resolve("../client/dist", "index.html"))
);

//! LISTENER
mongoose.connection.once("open", () => {
  console.log(`connected to mongoose`);
  app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`);
  });
});
