import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../App";
import ReactModal from "react-modal";
import Restriction from "./Restriction";

const User = () => {
  const navigate = useNavigate();
  const user = useContext(UserContext);
  const [flight, setFlight] = useState([]);
  const [airline, setAirline] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedFlight, setSelectedFlight] = useState({});

  const OutputPage = () => {
    navigate("/output");
  };

  useEffect(() => {
    fetch(`/api/flight/${user._id}`)
      .then((response) => response.json())
      .then((data) => setFlight(data));
  }, []);

  flight.sort((a, b) => {
    const nameA = a.airline.toUpperCase();
    const nameB = b.airline.toUpperCase();
    const etdA = a.etd;
    const etdB = b.etd;
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    if (nameA === nameB && etdA < etdB) {
      return -1;
    }
    if (nameA === nameB && etdA > etdB) {
      return 1;
    } else {
      return 0;
    }
  });

  useEffect(() => {
    fetch(`/api/airline`)
      .then((response) => response.json())
      .then((data) => setAirline(data));
  }, []);

  //! CREATE FLIGHT
  const addFlight = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const info = Object.fromEntries(formData);
    info.userid = `${user._id}`;

    const response = await fetch(`/api/flight/${user._id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(info),
    })
      .then((response) => response.json())
      .then((data) => setFlight([...flight, data]));
  };
  //!

  //! DELETE FLIGHT
  const handleDelete = (id) => {
    fetch(`/api/flight/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then(() => {
        setFlight(flight.filter((flight) => flight._id !== id));
      });
  };
  //!

  //! UPDATE FLIGHT
  const updateFlight = async (id) => {
    setModalIsOpen(true);
    setSelectedFlight([]);
    const response = await fetch(`/api/flight/user/${id}`);
    const data = await response.json();
    setSelectedFlight(data);
  };

  const editFlight = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const info = Object.fromEntries(formData);
    const response = await fetch(`/api/flight/${selectedFlight._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(info),
    });
    setModalIsOpen(false);
    const updatedresponse = await fetch(`/api/flight/${user._id}`);
    const data = await updatedresponse.json();
    setFlight(data);
  };

  return (
    <div class="relative overflow-x-auto">
      <div class="m-2">
        <button
          onClick={OutputPage}
          class="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          OUTPUT
        </button>
      </div>
      <div class="flex">
        <div>
          <Restriction />
        </div>

        <div class="relative overflow-x-auto">
          <form onSubmit={addFlight}>
            <div class="border w-96 inline-block items-left justify-center px-2 py-8 ml-2 mb-2">
              <h1 class="text-center underline ml-2 mb-2 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                FLIGHT
              </h1>
              <label class="block mt-2 mb-2 text-sm font-medium text-gray-900">
                AIRLINE:
              </label>
              <select
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 0"
                name="airline"
              >
                {airline.map((airline) => (
                  <option key={airline.name}>{airline.name}</option>
                ))}
              </select>
              <label
                for="callsign"
                class="block mt-2 mb-2 text-sm font-medium text-gray-900"
              >
                C/S:
              </label>
              <input
                list="callsigns"
                id="callsign"
                name="callsign"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              />
              <datalist id="callsigns">
                <option value="ALPHA"></option>
                <option value="BRAVO"></option>
                <option value="CHARLIE"></option>
                <option value="DELTA"></option>
                <option value="ECHO"></option>
                <option value="FOXTROT"></option>
                <option value="GOLF"></option>
                <option value="HOTEL"></option>
                <option value="INDIGO"></option>
                <option value="JULIET"></option>
                <option value="KILO"></option>
                <option value="LIMA"></option>
                <option value="MIKE"></option>
                <option value="NOVEMBER"></option>
                <option value="OSCAR"></option>
                <option value="PAPA"></option>
                <option value="QUEBEC"></option>
                <option value="ROMEO"></option>
                <option value="SIERRA"></option>
                <option value="TANGO"></option>
                <option value="UNIFORM"></option>
                <option value="VICTOR"></option>
                <option value="WHISKEY"></option>
                <option value="XRAY"></option>
                <option value="YANKEE"></option>
                <option value="ZULU"></option>
              </datalist>
              <label class="block mt-2 mb-2 text-sm font-medium text-gray-900">
                PAX:
              </label>
              <select
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                name="pax"
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
              </select>
              <label class="block mt-2 mb-2 text-sm font-medium text-gray-900">
                ETD:
              </label>
              <input
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                type="time"
                name="etd"
                min="06:00"
                defaultValue="08:00"
              ></input>
              <label class="block mt-2 mb-2 text-sm font-medium text-gray-900 ">
                ETA:
              </label>
              <input
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                type="time"
                name="eta"
                defaultValue="10:00"
              ></input>
              <label class="block mt-2 mb-2 text-sm font-medium text-gray-900 ">
                LOCATION:
              </label>
              <input
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                defaultValue="SCS"
                name="location"
              ></input>
              <label class="block mt-2 mb-2 text-sm font-medium text-gray-900 ">
                FLIGHT TYPE:
              </label>
              <select
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                name="type"
              >
                <option value="TRG">TRG</option>
                <option value="OPS">OPS</option>
              </select>
              <button class="mt-2 w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                ADD FLIGHT
              </button>
            </div>
          </form>
        </div>
      </div>

      <table class="m-2 w-full text-sm text-center text-gray-500 bg-gray-300">
        <thead class="text-xs text-gray-700 uppercase bg-gray-300">
          <tr>
            <th scope="col" class="px-6 py-3">
              AIRLINE
            </th>
            <th scope="col" class="px-6 py-3">
              C/S
            </th>
            <th scope="col" class="px-6 py-3">
              PAX
            </th>
            <th scope="col" class="px-6 py-3">
              ETD
            </th>
            <th scope="col" class="px-6 py-3">
              ETA
            </th>
            <th scope="col" class="px-6 py-3">
              LOCATION
            </th>
            <th scope="col" class="px-6 py-3">
              FLIGHT TYPE
            </th>
          </tr>
        </thead>
        <tbody>
          {flight.map((flight) => (
            <tr key={flight._id} class="bg-gray-100 border-b">
              <td
                class="text-gray-900 text-2xl font-bold bg-gray-600"
                style={{
                  color:
                    flight.airline === "111"
                      ? "red"
                      : flight.airline === "140"
                      ? "orange"
                      : flight.airline === "143"
                      ? "yellow"
                      : flight.airline === "145"
                      ? "mediumseagreen"
                      : flight.airline === "116"
                      ? "dodgerblue"
                      : flight.airline === "119"
                      ? "fuchsia"
                      : flight.airline === "UTS"
                      ? "pink"
                      : null,
                }}
              >
                {flight.airline}
              </td>
              <td
                scope="row"
                class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
              >
                {flight.callsign}
              </td>
              <td class="px-6 py-4">{flight.pax}</td>
              <td class="px-6 py-4">{flight.etd}</td>
              <td class="px-6 py-4">{flight.eta}</td>
              <td class="px-6 py-4">{flight.location}</td>
              <td class="px-6 py-4">{flight.type}</td>
              <td>
                <button
                  class="m-1 w-auto text-white bg-orange-600 hover:bg-orange-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  onClick={() => updateFlight(flight._id)}
                >
                  Edit
                </button>
                <button
                  class="m-1 w-auto text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  onClick={() => handleDelete(flight._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <ReactModal
        className="updatemodal"
        isOpen={modalIsOpen}
        ariaHideApp={false}
        onRequestClose={() => setModalIsOpen(false)}
      >
        <div class="w-fit rounded-3xl border-2 p-2 bg-gray-500 m-auto mt-10 p-4">
          <h2 class="mb-4 text-xl font-medium text-gray-900">UPDATE FLIGHT</h2>
          <form onSubmit={editFlight}>
            <label class="mb-2 text-sm font-medium text-gray-900">
              AIRLINE :
            </label>
            <select
              name="airline"
              class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 w-full p-2"
            >
              <option selected disabled hidden>
                {selectedFlight.airline}
              </option>
              {airline.map((airline) => (
                <option>{airline.name}</option>
              ))}
            </select>
            <br />
            <label class="inline mb-2 text-sm font-medium text-gray-900">
              C/S :
            </label>
            <input
              name="callsign"
              defaultValue={selectedFlight.callsign}
              class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 w-full p-2"
            ></input>
            <br />
            <label class="inline mb-2 text-sm font-medium text-gray-900">
              PAX :
            </label>
            <input
              type="number"
              name="pax"
              min="1"
              max="8"
              defaultValue={selectedFlight.pax}
              class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 w-full p-2"
            ></input>
            <br />
            <label class="inline mb-2 text-sm font-medium text-gray-900">
              ETD :
            </label>
            <input
              name="etd"
              type="time"
              defaultValue={selectedFlight.etd}
              class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 w-full p-2"
            ></input>
            <br />
            <label class="inline mb-2 text-sm font-medium text-gray-900">
              ETA :
            </label>
            <input
              name="eta"
              type="time"
              defaultValue={selectedFlight.eta}
              class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 w-full p-2"
            ></input>
            <br />
            <label class="inline mb-2 text-sm font-medium text-gray-900">
              LOCATION :
            </label>
            <input
              name="location"
              defaultValue={selectedFlight.location}
              class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 w-full p-2"
            ></input>
            <br />
            <label class="inline mb-2 text-sm font-medium text-gray-900">
              TYPE :
            </label>
            <select
              name="type"
              class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 w-full p-2"
            >
              <option selected disabled hidden>
                {selectedFlight.type}
              </option>
              <option value="TRG">TRG</option>
              <option value="OPS">OPS</option>
            </select>
            <br />
            <button class="mt-2 w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
              UPDATE
            </button>
          </form>
        </div>
      </ReactModal>
    </div>
  );
};

export default User;
