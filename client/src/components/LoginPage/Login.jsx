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
      <section class="bg-gray-200">
        <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div class="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
            <div class="p-6 space-y-3 md:space-y-3 sm:p-8">
              <img
                class="w-10 h-10 mr-2 flex items-center mb-6 text-2xl font-semibold text-gray-900"
                src="https://cdn4.vectorstock.com/i/1000x1000/43/03/airplane-logo-template-icon-design-vector-35304303.jpg"
                alt="logo"
              ></img>
              <form onSubmit={signIn} class="space-y-4 md:space-y-6">
                <label class="block mb-2 text-sm font-medium text-gray-900">
                  USERNAME :
                </label>
                <input
                  type="text"
                  name="username"
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                ></input>
                <br />
                <label class="block mb-2 text-sm font-medium text-gray-900">
                  PASSWORD :
                </label>
                <input
                  type="password"
                  name="password"
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                ></input>
                <br />
                <button class="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                  LOGIN
                </button>
                <div class="font-medium text-red-600">{errorMsg}</div>
                <hr />
                <p class="text-sm font-light text-gray-500">
                  Need An Account ?
                  <span
                    class="font-medium text-blue-600 hover:underline pl-1 cursor-pointer"
                    onClick={registrationPage}
                  >
                    Register
                  </span>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
