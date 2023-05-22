import { Routes, Route } from "react-router-dom";
import App from "./App";
import About from "./About";
import Register from "./Register";
import Login from "./Login";
import useToken from "./useToken";

const PrimaryRoute = () => {
  const { token, removeToken, setToken } = useToken();
  return (
    <>
      {" "}
      <Routes>
        <Route exact path="/" element={<App token={token} setToken={setToken}/>}></Route>
        <Route exact path="/about" element={<About />}></Route>
        <Route exact path="/login" element={<Login />}></Route>
        <Route exact path="/register" element={<Register />}></Route>
      </Routes>
    </>
  );
};

export default PrimaryRoute;
