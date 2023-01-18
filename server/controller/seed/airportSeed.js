const Airport = require("../../model/Airport");

const seedAirport = async (req, res) => {
  const seedAirport = [
    {
      name: "West",
      airline: ["AirlineA", "AirlineB", "AirlineC"],
    },
    {
      name: "East",
      airline: ["Airline1", "Airline2", "Airline3"],
    },
  ];
  await Airport.deleteMany({});
  const airport = await Airport.insertMany(seedAirport);
  res.json(airport);
};

module.exports = seedAirport;
