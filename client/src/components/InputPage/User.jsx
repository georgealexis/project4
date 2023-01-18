import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../App";
import ReactModal from "react-modal";

const User = () => {
  const navigate = useNavigate();
  const user = useContext(UserContext);
  const [flight, setFlight] = useState([]);
  const [airline, setAirline] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedFlight, setSelectedFlight] = useState({});
  const [sortedField, setSortedField] = useState("");

  const OutputPage = () => {
    navigate("/output");
  };

  useEffect(() => {
    fetch(`/api/flight/${user._id}`)
      .then((response) => response.json())
      .then((data) => setFlight(data));
  }, []);

  flight.sort((a, b) => {
    const nameA = a.airline.toUpperCase(); // ignore upper and lowercase
    const nameB = b.airline.toUpperCase(); // ignore upper and lowercase
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    // names must be equal
    return 0;
  });

  console.log(flight);

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

  console.log(sortedField);

  return (
    <>
      <div>
        <button onClick={OutputPage}>Output</button>
        <button> {user.callsign}</button>
      </div>

      <div>
        <fieldset id="fieldset2">
          <form onSubmit={addFlight}>
            <label className="inputpagelabel">AIRLINE:</label>
            <select className="inputpagebox" name="airline">
              {airline.map((airline) => (
                <option key={airline.name}>{airline.name}</option>
              ))}
            </select>
            <label className="inputpagelabel">C/S:</label>
            <input
              className="inputpagebox"
              name="callsign"
              defaultValue="ALPHA"
            ></input>
            <label className="inputpagelabel">PAX:</label>
            <select className="inputpagebox" name="pax">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
            </select>
            <label className="inputpagelabel">ETD:</label>
            <input
              className="inputpagebox"
              type="time"
              name="etd"
              min="06:00"
              defaultValue="08:00"
            ></input>
            <label className="inputpagelabel">ETA:</label>
            <input
              className="inputpagebox"
              type="time"
              name="eta"
              defaultValue="10:00"
            ></input>
            <label className="inputpagelabel">LOCATION:</label>
            <input
              className="inputpagebox"
              defaultValue="SCS"
              name="location"
            ></input>
            <label className="inputpagelabel">FLIGHT TYPE:</label>
            <select className="inputpagebox" name="type">
              <option value="TRG">TRG</option>
              <option value="OPS">OPS</option>
            </select>
            <button className="inputpagebutton">+</button>
          </form>
        </fieldset>
      </div>

      <table id="restable">
        <thead>
          <tr>
            <th>AIRLINE</th>
            <th>C/S</th>
            <th>PAX</th>
            <th>
              <button onClick={() => setSortedField("etd")}>ETD</button>
            </th>
            <th>
              <button onClick={() => setSortedField("eta")}>ETA</button>
            </th>
            <th>LOCATION</th>
            <th>FLIGHT TYPE</th>
          </tr>
        </thead>
        <tbody>
          {flight.map((flight) => (
            <tr key={flight._id}>
              <td>{flight.airline}</td>
              <td>{flight.callsign}</td>
              <td>{flight.pax}</td>
              <td>{flight.etd}</td>
              <td>{flight.eta}</td>
              <td>{flight.location}</td>
              <td>{flight.type}</td>
              <td id="lastcolumn">
                <button
                  className="tablebtn"
                  onClick={() => updateFlight(flight._id)}
                >
                  Edit
                </button>
                <button
                  className="tablebtn"
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
        <h2>Update Flight</h2>
        <form onSubmit={editFlight}>
          Airline:
          <select name="airline">
            <option selected disabled hidden>
              {selectedFlight.airline}
            </option>
            {airline.map((airline) => (
              <option>{airline.name}</option>
            ))}
          </select>
          <br />
          C/S:
          <input name="callsign" defaultValue={selectedFlight.callsign}></input>
          <br />
          Pax:
          <input
            type="number"
            name="pax"
            min="1"
            max="8"
            defaultValue={selectedFlight.pax}
          ></input>
          <br />
          ETD:
          <input
            name="etd"
            type="time"
            defaultValue={selectedFlight.etd}
          ></input>
          <br />
          ETA:
          <input
            name="eta"
            type="time"
            defaultValue={selectedFlight.eta}
          ></input>
          <br />
          Location:
          <input name="location" defaultValue={selectedFlight.location}></input>
          <br />
          Type:
          <select name="type">
            <option selected disabled hidden>
              {selectedFlight.type}
            </option>
            <option value="TRG">TRG</option>
            <option value="OPS">OPS</option>
          </select>
          <br />
          <button>Update</button>
        </form>
      </ReactModal>
    </>
  );
};

export default User;
