import { useState, useEffect } from "react";
import ReactModal from "react-modal";

const AdminAirlineData = () => {
  const [selectedAirline, setSelectedAirline] = useState([]);
  const [airline, setAirline] = useState([]);
  const [airlineModalIsOpen, setAirlineModalIsOpen] = useState(false);

  //! FETCH AIRLINE
  useEffect(() => {
    fetch(`/api/airline`)
      .then((response) => response.json())
      .then((data) => setAirline(data));
  }, []);

  //! CREATE AIRLINE
  const addNewAirline = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const info = Object.fromEntries(formData);
    const response = await fetch("/api/airline", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(info),
    })
      .then((response) => response.json())
      .then((data) => setAirline([...airline, data]));
  };

  //! DELETE AIRLINE
  const deleteAirline = (id) => {
    fetch(`/api/airline/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then(() => {
        setAirline(airline.filter((airline) => airline._id !== id));
      });
  };

  //! UPDATE AIRLINE
  const updateAirline = async (id) => {
    setAirlineModalIsOpen(true);
    setSelectedAirline([]);
    const response = await fetch(`/api/airline/${id}`);
    const data = await response.json();
    setSelectedAirline(data);
  };

  const editAirline = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const info = Object.fromEntries(formData);
    const response = await fetch(`/api/airline/${selectedAirline._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(info),
    });
    setModalIsOpen(false);
    const updatedresponse = await fetch(`/api/airline/`);
    const data = await updatedresponse.json();
    setAirline(data);
  };

  return (
    <>
      <div>
        <h1>Airline</h1>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>
                <form onSubmit={addNewAirline}>
                  <input name="name"></input>
                  <button className="tablebtn"> ADD NEW AIRLINE </button>
                </form>
              </th>
            </tr>
          </thead>
          <tbody>
            {airline.map((airline) => (
              <tr key={airline._id}>
                <td>{airline.name}</td>
                <td id="lastcolumn">
                  <button
                    className="tablebtn"
                    onClick={() => updateAirline(airline._id)}
                  >
                    Edit
                  </button>
                  <button
                    className="tablebtn"
                    onClick={() => deleteAirline(airline._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ReactModal
        className="updatemodal"
        isOpen={airlineModalIsOpen}
        ariaHideApp={false}
        onRequestClose={() => setAirlineModalIsOpen(false)}
      >
        <h2>Update Airline</h2>
        <form onSubmit={editAirline}>
          Name:
          <input name="name" defaultValue={selectedAirline.name}></input>
          <button>Update</button>
        </form>
      </ReactModal>
    </>
  );
};

export default AdminAirlineData;
