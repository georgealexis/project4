import { useState, useEffect } from "react";
import ReactModal from "react-modal";

const AdminUserData = () => {
  const [user, setUser] = useState([]);
  const [selectedUser, setSelectedUser] = useState([]);
  const [userModalIsOpen, setUserModalIsOpen] = useState(false);

  //! FETCH USER
  useEffect(() => {
    fetch(`/api/user`)
      .then((response) => response.json())
      .then((data) => setUser(data));
  }, []);

  //! DELETE USER
  const handleDelete = (id) => {
    fetch(`/api/user/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then(() => {
        setUser(user.filter((user) => user._id !== id));
      });
  };
  //!

  //! UPDATE USER
  const updateUser = async (id) => {
    setUserModalIsOpen(true);
    setSelectedUser([]);
    const response = await fetch(`/api/user/${id}`);
    const data = await response.json();
    setSelectedUser(data);
  };

  const editUser = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const info = Object.fromEntries(formData);
    const response = await fetch(`/api/user/${selectedUser._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(info),
    });
    setUserModalIsOpen(false);
    const updatedresponse = await fetch(`/api/user/`);
    const data = await updatedresponse.json();
    setUser(data);
  };

  return (
    <div class="m-3">
      <h1 class="text-left underline mb-2 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
        USERS
      </h1>
      <table class="w-1/2 text-sm text-center text-gray-500 border">
        <thead class="text-xs text-gray-700 uppercase bg-gray-300">
          <tr>
            <th scope="col" class="px-6 py-3">
              Name
            </th>
            <th scope="col" class="px-6 py-3">
              Callsign
            </th>
            <th scope="col" class="px-6 py-3">
              Username
            </th>
          </tr>
        </thead>
        <tbody>
          {user.map((user) => (
            <tr key={user._id} class="bg-white border-b">
              <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                {user.name}
              </td>
              <td>{user.callsign}</td>
              <td>{user.username}</td>
              <td>
                <button
                  class="m-1 w-auto text-white bg-orange-600 hover:bg-orange-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  onClick={() => updateUser(user._id)}
                >
                  Edit
                </button>
                <button
                  class="m-1 w-auto text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  onClick={() => handleDelete(user._id)}
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
        isOpen={userModalIsOpen}
        ariaHideApp={false}
        onRequestClose={() => setUserModalIsOpen(false)}
      >
        <div class="w-fit rounded-3xl border-2 p-2 bg-gray-500 m-auto mt-10 p-4">
          <h2 class="mb-4 text-xl font-medium text-gray-900">
            UPDATE USER PROFILE
          </h2>
          <form onSubmit={editUser}>
            Name:
            <input
              name="name"
              defaultValue={selectedUser.name}
              class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 w-full p-2"
            ></input>
            Callsign:
            <input
              name="callsign"
              defaultValue={selectedUser.callsign}
              class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 w-full p-2"
            ></input>
            Username:
            <input
              name="username"
              defaultValue={selectedUser.username}
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

export default AdminUserData;
