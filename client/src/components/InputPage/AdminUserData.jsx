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
    <>
      <h1>Users</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Callsign</th>
            <th>Username</th>
          </tr>
        </thead>
        <tbody>
          {user.map((user) => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.callsign}</td>
              <td>{user.username}</td>
              <td id="lastcolumn">
                <button
                  className="tablebtn"
                  onClick={() => updateUser(user._id)}
                >
                  Edit
                </button>
                <button
                  className="tablebtn"
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
        <h2>Update User Profile</h2>
        <form onSubmit={editUser}>
          Name:
          <input name="name" defaultValue={selectedUser.name}></input>
          Callsign:
          <input name="callsign" defaultValue={selectedUser.callsign}></input>
          Username:
          <input name="username" defaultValue={selectedUser.username}></input>
          <button>Update</button>
        </form>
      </ReactModal>
    </>
  );
};

export default AdminUserData;
