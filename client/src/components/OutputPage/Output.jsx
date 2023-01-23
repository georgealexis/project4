import { useEffect, useState, useContext } from "react";
import { UserContext } from "../../App";

const Output = () => {
  const user = useContext(UserContext);
  const [flight, setFlight] = useState([]);
  const [restriction, setRestriction] = useState([]);

  //! FETCH FLIGHTS
  useEffect(() => {
    fetch(`/api/flight/${user._id}`)
      .then((response) => response.json())
      .then((data) => setFlight(data));
  }, []);

  //! FETCH RESTRICTIONS
  useEffect(() => {
    fetch(`/api/restriction/${user._id}`)
      .then((response) => response.json())
      .then((data) => setRestriction(data));
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
    hours = hours * 100;

    let mins = etd.slice(3);
    mins = mins * 1.67;

    let result = hours + mins;
    return result;
  };

  //! ETA
  const width = (etd, eta) => {
    let etdhours = etd.slice(0, 2);
    etdhours = etdhours * 100;

    let etdmins = etd.slice(3);
    etdmins = etdmins * 1.67;

    let etdresult = etdhours + etdmins;

    let etahours = eta.slice(0, 2);
    etahours = etahours * 100;

    let etamins = eta.slice(3);
    etamins = etamins * 1.67;

    let etaresult = etahours + etamins;

    let widthResults = Math.abs(etdresult - etaresult);
    return widthResults;
  };

  //! RESTRICTION

  const reswidth = (start, end) => {
    let starthours = start.slice(0, 2);
    starthours = starthours * 100;

    let startmins = start.slice(3);
    startmins = startmins * 1.67;

    let startresults = starthours + startmins;

    let endhours = end.slice(0, 2);
    endhours = endhours * 100;

    let endmins = end.slice(3);
    endmins = endmins * 1.67;

    let endresults = endhours + endmins;

    let reswidthResult = Math.abs(startresults - endresults);
    console.log(reswidthResult);
    return reswidthResult;
  };

  const resMarginleft = (start) => {
    let hours = start.slice(0, 2);
    hours = hours - 6;
    hours = hours * 100 + 100;

    let mins = start.slice(3);
    mins = mins * 1.67;

    let result = hours + mins;
    return result;
  };

  return (
    <div class="w-1800">
      {restriction.map((restriction) => (
        <div key={restriction._id}>
          <div
            class="absolute border bg-gray-200 h-1605 opacity-50 mt-4 -z-50"
            style={{
              width: reswidth(restriction["start"], restriction["end"]),
              marginLeft: resMarginleft(restriction["start"]),
            }}
          >
            {restriction.start}-{restriction.end}
          </div>
        </div>
      ))}
      <table class="w-1800 text-sm text-gray-500 ml-100 border fixed">
        <thead class="w-1800 text-xs text-gray-700 align-text-top h-20 border ">
          <tr>
            <th class="border">0600H</th>
            <th class="border">0700H</th>
            <th class="border">0800H</th>
            <th class="border">0900H</th>
            <th class="border">1000H</th>
            <th class="border">1100H</th>
            <th class="border">1200H</th>
            <th class="border">1300H</th>
            <th class="border">1400H</th>
            <th class="border">1500H</th>
            <th class="border">1600H</th>
            <th class="border">1700H</th>
            <th class="border">1800H</th>
            <th class="border">1900H</th>
            <th class="border">2000H</th>
            <th class="border">2100H</th>
            <th class="border">2200H</th>
            <th class="border">2300H</th>
          </tr>
        </thead>
      </table>

      <div class="pt-20">
        {airlineArray.map((flight) => (
          <div class="flex" key={flight[0]}>
            <div class="border w-100 text-center font-medium text-gray-900">
              {flight[0]}
            </div>
            <div class="text-center">
              {flight[1].map((element) => (
                <div
                  class="border-solid border-2 border-black mt-1 mb-1"
                  style={{
                    marginLeft: marginLeft(element["etd"]),
                    width: width(element["etd"], element["eta"]),
                    backgroundColor:
                      element.type === "OPS" ? "dodgerblue" : "greenyellow",
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
      </div>
    </div>
  );
};

export default Output;
