import Navbar1 from "./Navbar1";
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import PrimaryRoutes from "./PrimaryRoute";
import Footer from "./Footer";
import useToken from "./useToken";
import Login from "./Login";
const Main = () => {
  const { token, removeToken, setToken } = useToken();
  console.log(token);
  return (
    <>
      <Router>
        <Navbar1 token={removeToken} />
        <br></br>

        <>
          <PrimaryRoutes />
        </>

        <Footer />
      </Router>
    </>
  );
};
export default Main;
