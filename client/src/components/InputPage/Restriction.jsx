import { useContext, useState, useEffect } from "react";
import { UserContext } from "../../App";

const Restriction = () => {
  const user = useContext(UserContext);
  const [restriction, setRestriction] = useState([]);

  useEffect(() => {
    fetch(`/api/restriction/${user._id}`)
      .then((response) => response.json())
      .then((data) => setRestriction(data));
  }, []);

  restriction.sort((a, b) => {
    const nameA = a.name.toUpperCase();
    const nameB = b.name.toUpperCase();
    const startA = a.start;
    const startB = b.start;
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    if (nameA === nameB && startA < startB) {
      return -1;
    }
    if (nameA === nameB && startA > startB) {
      return 1;
    } else {
      return 0;
    }
  });

  //! CREATE RESTRICTION
  const addRestriction = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const info = Object.fromEntries(formData);
    info.userid = `${user._id}`;
    const response = await fetch(`/api/restriction/${user._id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(info),
    })
      .then((response) => response.json())
      .then((data) => setRestriction([...restriction, data]));
  };

  //! DELETE RESTRICTION
  const handleDelete = (id) => {
    fetch(`/api/restriction/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then(() => {
        setRestriction(
          restriction.filter((restriction) => restriction._id !== id)
        );
      });
  };
  //!

  return (
    <div class="flex">
      <div class="border w-96 inline-block items-left justify-center px-2 py-4 ml-2 mb-2">
        <h1 class="text-center underline mb-2 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
          RESTRICTIONS
        </h1>
        <table class="m-auto w-full text-sm text-center text-gray-500">
          <thead class="text-xs text-gray-700 uppercase bg-gray-300">
            <tr>
              <th scope="col" class="px-6 py-3">
                <form onSubmit={addRestriction}>
                  <label class="text-xl font-medium text-gray-900">NAME:</label>
                  <select name="name" class="text-xl w-36 ml-3">
                    <option value="WCTC">WCTC</option>
                    <option value="PD">PD</option>
                    <option value="AERO">AERO</option>
                    <option value="GND">GND</option>
                    <option value="EXAM">EXAM</option>
                    <option value="CCTFRZ">CCTFRZ</option>
                  </select>
                  <br />
                  <label class="text-xl font-medium text-gray-900">
                    START:
                  </label>
                  <input
                    type="time"
                    name="start"
                    defaultValue="07:00"
                    class="text-xl w-36 ml-2 mt-2"
                  ></input>
                  <br />
                  <label class="text-xl font-medium text-gray-900">END:</label>
                  <input
                    type="time"
                    name="end"
                    defaultValue="12:00"
                    class="text-xl w-36 ml-5 mt-2"
                  ></input>
                  <button class="mt-2 w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                    ADD RESTRICTION
                  </button>
                </form>
              </th>
            </tr>
          </thead>
        </table>
      </div>
      <div class="border w-auto inline-block items-left justify-center px-2 py-4 ml-2 mb-2">
        <table class="m-auto w-96 text-sm text-center text-gray-500">
          <thead class="text-xl text-gray-700 uppercase bg-gray-300">
            <tr>
              <th scope="col" class="px-6 py-3">
                NAME
              </th>
              <th scope="col" class="px-6 py-3">
                START
              </th>
              <th scope="col" class="px-6 py-3">
                END
              </th>
            </tr>
          </thead>
          <tbody>
            {restriction.map((restriction) => (
              <tr key={restriction._id} class="bg-white border-b">
                <td
                  class="font-bold text-xl text-gray-900"
                  style={{
                    backgroundColor:
                      restriction.name === "WCTC"
                        ? "cyan"
                        : restriction.name === "PD"
                        ? "rebeccapurple"
                        : restriction.name === "AERO"
                        ? "palevioletred"
                        : restriction.name === "GND"
                        ? "forestgreen"
                        : restriction.name === "EXAM"
                        ? "red"
                        : restriction.name === "CCTFRZ"
                        ? "gray"
                        : null,
                  }}
                >
                  {restriction.name}
                </td>
                <td>{restriction.start}</td>
                <td>{restriction.end}</td>
                <td>
                  <button
                    class="m-1 w-auto text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    onClick={() => handleDelete(restriction._id)}
                  >
                    DELETE
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Restriction;
