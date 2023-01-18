import { useNavigate } from "react-router-dom";

const Registration = () => {
  const navigate = useNavigate();

  //! ADD USER
  const registerUser = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const info = Object.fromEntries(formData);

    const response = await fetch("/api/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(info),
    });
    navigate("/login");
  };

  return (
    <>
      <div id="loginbox">
        <h1>Register</h1>
        <form onSubmit={registerUser}>
          <label>Name :</label>
          <input type="text" name="name"></input>
          <br />
          <label>Callsign :</label>
          <input type="text" name="callsign"></input>
          <br />
          <label>Username :</label>
          <input type="text" name="username"></input>
          <br />
          <label>Password :</label>
          <input type="password" name="password"></input>
          <br />
          <button id="loginbutton">Register</button>
        </form>
      </div>
      <footer>GEO ©</footer>
    </>
  );
};

export default Registration;
