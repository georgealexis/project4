import { useEffect, useState, useContext } from "react";
import { UserContext } from "../../App";

const Output = () => {
  const user = useContext(UserContext);
  const [flight, setFlight] = useState([]);

  //! FETCH FLIGHTS
  useEffect(() => {
    fetch(`/api/flight/${user._id}`)
      .then((response) => response.json())
      .then((data) => setFlight(data));
  }, []);

  //! GROUP DATA BY AIRLINE
  const groupByCategory = flight.reduce((group, product) => {
    const { airline } = product;
    group[airline] = group[airline] ?? [];
    group[airline].push(product);
    return group;
  }, {});

  //! RETURNS ARRAY
  let airlineArray = Object.entries(groupByCategory);

  //! ETD
  const marginLeft = (etd) => {
    let hours = etd.slice(0, 2);
    hours = hours - 6;
    hours = hours * 160;

    let mins = etd.slice(3);
    mins = mins * 2.67;

    let result = hours + mins;
    return result;
  };

  //! ETA
  const width = (etd, eta) => {
    let etdhours = etd.slice(0, 2);
    etdhours = etdhours * 160;

    let etdmins = etd.slice(3);
    etdmins = etdmins * 2.67;

    let etdresult = etdhours + etdmins;

    let etahours = eta.slice(0, 2);
    etahours = etahours * 160;

    let etamins = eta.slice(3);
    etamins = etamins * 2.67;

    let etaresult = etahours + etamins;

    let widthResults = Math.abs(etdresult - etaresult);
    return widthResults;
  };

  return (
    <>
      <table id="flyprotable">
        <thead>
          <tr>
            <th>0600H</th>
            <th>0700H</th>
            <th>0800H</th>
            <th>0900H</th>
            <th>1000H</th>
            <th>1100H</th>
            <th>1200H</th>
            <th>1300H</th>
            <th>1400H</th>
            <th>1500H</th>
            <th>1600H</th>
            <th>1700H</th>
            <th>1800H</th>
            <th>1900H</th>
            <th>2000H</th>
            <th>2100H</th>
            <th>2200H</th>
            <th>2300H</th>
          </tr>
        </thead>
      </table>

      {airlineArray.map((flight) => (
        <div className="airlinerow" key={flight[0]}>
          <div className="airlinelabel">{flight[0]}</div>
          <div className="multipletimerow">
            {flight[1].map((element) => (
              <div
                className="timerow"
                style={{
                  marginLeft: marginLeft(element["etd"]),
                  width: width(element["etd"], element["eta"]),
                  backgroundColor: element.type === "OPS" ? "blue" : "green",
                }}
              >
                {element.callsign} x {element.pax} <br /> {element.etd}H -
                {element.eta}H <br />
                {element.location}
              </div>
            ))}
          </div>
        </div>
      ))}
    </>
  );
};

export default Output;
