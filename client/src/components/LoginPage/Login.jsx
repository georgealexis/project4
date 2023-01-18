import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Login = ({ setUserIs, setLoggedInAs }) => {
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  //! SIGN IN
  const signIn = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const info = Object.fromEntries(formData);
    const response = await fetch("/api/session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(info),
    });

    const data = await response.json();
    if (response.ok) {
      navigate(`/input/${data._id}`);
      setUserIs(data);
      if (data.name != "Adminstrator") {
        setLoggedInAs("user");
      } else {
        setLoggedInAs("admin");
      }
    } else {
      console.log("data", data);
      setErrorMsg("Invalid Username/Password");
    }
  };

  const registrationPage = () => {
    navigate("/registration");
  };

  return (
    <>
      <div id="loginbox">
        <h1>Login</h1>
        <form onSubmit={signIn}>
          <label>Username :</label>
          <input type="text" name="username"></input>
          <br />
          <label>Password :</label>
          <input type="password" name="password"></input>
          <br />
          <button id="loginbutton">Login</button>
          <div id="errormsg">{errorMsg}</div>
          <hr />
          <p>
            Need An Account?
            <span id="registerbtn" onClick={registrationPage}>
              Register
            </span>
          </p>
        </form>
      </div>
      <footer>GEO ©</footer>
    </>
  );
};

export default Login;
