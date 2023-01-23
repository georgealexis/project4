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
      <section class="bg-gray-200">
        <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 ">
            <div class="p-6 space-y-3 md:space-y-3 sm:p-8">
              <img
                class="w-10 h-10 mr-2 flex items-center mb-6 text-2xl font-semibold text-gray-900 "
                src="https://cdn4.vectorstock.com/i/1000x1000/43/03/airplane-logo-template-icon-design-vector-35304303.jpg"
                alt="logo"
              ></img>
              <form onSubmit={registerUser} class="space-y-4 md:space-y-6">
                <label class="block mb-2 text-sm font-medium text-gray-900">
                  NAME :
                </label>
                <input
                  type="text"
                  name="name"
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                ></input>
                <br />
                <label class="block mb-2 text-sm font-medium text-gray-900">
                  CALLSIGN :
                </label>
                <input
                  type="text"
                  name="callsign"
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                ></input>
                <br />
                <label class="block mb-2 text-sm font-medium text-gray-900">
                  USERNAME :
                </label>
                <input
                  type="text"
                  name="username"
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                ></input>
                <br />
                <label class="block mb-2 text-sm font-medium text-gray-900">
                  PASSWORD :
                </label>
                <input
                  type="password"
                  name="password"
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                ></input>
                <br />
                <button class="w-full text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                  REGISTER
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Registration;
