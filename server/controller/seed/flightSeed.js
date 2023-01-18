const Flight = require("../../model/Flight");

const seedFlight = async (req, res) => {
  const seedFlight = [
    {
      airline: "Airline 1",
      callsign: "ALPHA",
      pax: 2,
      etd: "08:15",
      eta: "09:30",
      location: "SCS",
      type: "TRG",
    },
  ];
  await Flight.deleteMany({});
  const flight = await Flight.insertMany(seedFlight);
  res.json(flight);
};

module.exports = seedFlight;
