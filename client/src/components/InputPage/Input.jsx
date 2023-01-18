import User from "../InputPage/User";
import Admin from "../InputPage/Admin";

const Input = ({ loggedInAs }) => {
  if (loggedInAs === "user") {
    return <User />;
  }

  if (loggedInAs === "admin") {
    return <Admin />;
  }
};
export default Input;
