import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/LoginPage/Login";
import Registration from "./components/RegistrationPage/Registration";
import Input from "./components/InputPage/Input";
import Output from "./components/OutputPage/Output";
import { useState, createContext } from "react";

export const UserContext = createContext();

function App() {
  const [loggedInAs, setLoggedInAs] = useState();
  const [userIs, setUserIs] = useState({});

  return (
    <UserContext.Provider value={userIs}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/login"
            element={
              <Login setUserIs={setUserIs} setLoggedInAs={setLoggedInAs} />
            }
          />
          <Route path="/registration" element={<Registration />} />
          <Route
            path="/input/:user"
            element={<Input userIs={userIs} loggedInAs={loggedInAs} />}
          />
          <Route path="/output" element={<Output userIs={userIs} />} />
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
