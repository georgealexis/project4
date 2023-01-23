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
    <div class="m-3">
      <div>
        <h1 class="text-left underline mb-2 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
          AIRLINE
        </h1>
        <table class="w-1/2 text-sm text-center text-gray-500 border">
          <thead class="text-xs text-gray-700 uppercase bg-gray-300">
            <tr>
              <th scope="col" class="px-6 py-3">
                Name
              </th>
              <th scope="col" class="px-6 py-3">
                <form onSubmit={addNewAirline}>
                  <input
                    name="name"
                    class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 w-full p-2"
                  ></input>
                  <button class="mt-2 w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                    ADD NEW AIRLINE
                  </button>
                </form>
              </th>
            </tr>
          </thead>
          <tbody>
            {airline.map((airline) => (
              <tr key={airline._id} class="bg-white border-b">
                <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                  {airline.name}
                </td>
                <td>
                  <button
                    class="m-1 w-auto text-white bg-orange-600 hover:bg-orange-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    onClick={() => updateAirline(airline._id)}
                  >
                    Edit
                  </button>
                  <button
                    class="m-1 w-auto text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
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
        <div class="w-fit rounded-3xl border-2 p-2 bg-gray-500 m-auto mt-10 p-4">
          <h2 class="mb-4 text-xl font-medium text-gray-900">UPDATE AIRLINE</h2>
          <form onSubmit={editAirline}>
            Name:
            <input
              name="name"
              defaultValue={selectedAirline.name}
              class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 w-full p-2"
            ></input>
            <button class="mt-2 w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
              Update
            </button>
          </form>
        </div>
      </ReactModal>
    </div>
  );
};

export default AdminAirlineData;
