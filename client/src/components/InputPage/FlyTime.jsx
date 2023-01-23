import { useContext, useState, useEffect } from "react";
import { UserContext } from "../../App";

const FlyTime = () => {
  const user = useContext(UserContext);
  const [restriction, setRestriction] = useState([]);

  useEffect(() => {
    fetch(`/api/restriction/${user._id}`)
      .then((response) => response.json())
      .then((data) => setRestriction(data));
  }, []);

  restriction.sort((a, b) => {
    const startA = a.start;
    const startB = b.start;
    if (startA < startB) {
      return -1;
    }
    if (startA > startB) {
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
    <div class="flex flex-col">
      <div class="border w-96 inline-block items-left justify-center px-2 py-4 ml-2 mb-2">
        <h1 class="text-center underline mb-2 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
          RESTRICTIONS
        </h1>
        <table class="m-auto w-full text-sm text-center text-gray-500">
          <thead class="text-xs text-gray-700 uppercase bg-gray-300">
            <tr>
              <th scope="col" class="text-xl px-6 py-3">
                FLYTIME
              </th>
              <th scope="col" class="px-6 py-3">
                <form onSubmit={addRestriction}>
                  <label class="text-sm font-medium text-gray-900">
                    START:
                  </label>
                  <input
                    type="time"
                    name="start"
                    defaultValue="07:00"
                    class="text-sm w-24 ml-2"
                  ></input>
                  <br />
                  <label class="text-sm text-sm font-medium text-gray-900">
                    END:
                  </label>
                  <input
                    type="time"
                    name="end"
                    defaultValue="12:00"
                    class="text-sm w-24 ml-5 mt-2"
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
        <table class="m-auto w-full text-sm text-center text-gray-500">
          <thead class="text-xs text-gray-700 uppercase bg-gray-300">
            <tr>
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

export default FlyTime;
