const User = require("../../model/User");
const bcrypt = require("bcrypt");

const seedUser = async (req, res) => {
  const seedUser = [
    {
      name: "George",
      callsign: "Geo",
      username: "George",
      password: bcrypt.hashSync("George123", 10),
      airport: "East",
    },
    {
      name: "Bernice",
      callsign: "Ber",
      username: "Bernice",
      password: bcrypt.hashSync("Bernice123", 10),
      airport: "West",
    },
  ];
  await User.deleteMany({});
  const newuser = await User.insertMany(seedUser);
  res.json(newuser);
};

module.exports = seedUser;
