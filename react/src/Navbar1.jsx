import { useState, useEffect } from "react";
import { Link, NavLink, useHistory, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
} from "@material-tailwind/react";
import {
  MDBNavbar,
  MDBContainer,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBCollapse,
  MDBBtn,
  MDBIcon,
  MDBNavbarNav,
  MDBInputGroup,
} from "mdb-react-ui-kit";
import useToken from "./useToken";
import Register from "./Register";

export default function Navbar1(props) {
  // const { token, removeToken, setToken } = useToken();
  const tok = localStorage.getItem("token");
  const [openNav, setOpenNav] = useState(false);
  const [token, setToken] = useState(tok);

  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  // useEffect(() => {
  //   const tok = localStorage.getItem("token");
  //   setToken(tok);
  // }, [token]);

  // const navList = (
  //   <div className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
  //     <MDBNavbarLink className="flex items-center">
  //       <Link to="/">Home</Link>
  //     </MDBNavbarLink>
  //     <MDBNavbarLink href="/about" className="flex items-center">
  //       <NavLink to="/about">About</NavLink>
  //     </MDBNavbarLink>
  //   </div>
  // );

  // function logMeOut() {
  //   axios({
  //     method: "POST",
  //     url: "/logout",
  //   })
  //     .then((response) => {
  //       props.token();
  //     })
  //     .catch((error) => {
  //       if (error.response) {
  //         console.log(error.response);
  //         console.log(error.response.status);
  //         console.log(error.response.headers);
  //       }
  //     });
  // }
  // const isActive = "no";
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    navigate("login");
  };

  // console.log(token);

  return (
    <MDBNavbar className="mx-auto max-w-screen-xl py-2 px-4 lg:px-8 lg:py-4">
      <div className="container mx-auto flex items-center justify-between ">
        <MDBNavbarBrand>
          <MDBNavbarLink Link to="/">
            <span style={{ color: "red", fontWeight: "bold" }}>
              REDDIT ANALYSIS
            </span>
          </MDBNavbarLink>
        </MDBNavbarBrand>

        <NavLink to="/" className="flex items-center" style={{ color: "red" }}>
          Home
        </NavLink>
        <NavLink
          to="/about"
          className="flex items-center"
          style={{ color: "red" }}
        >
          About
        </NavLink>
        {localStorage.getItem("token") ? (
          <Button onClick={logout} color="red">
            Logout
          </Button>
        ) : (
          <NavLink to="/register" className="flex items-center">
            <Button color="red">Register</Button>
          </NavLink>
        )}
        {/* <NavLink to="/about" className="flex items-center">
          logout
        </NavLink> */}

        {/* {isActive=="yes"?<MDBBtn onClick={logMeOut} variant="gradient" size="sm" className="hidden lg:inline-block">
          <span>Log out</span>
        </MDBBtn>:<MDBBtn onClick={logMeOut} variant="gradient" size="sm" className="hidden lg:inline-block">
          <span>Register</span>
        </MDBBtn>} */}
        {/* <IconButton
          variant="text"
          className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          ripple={false}
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              className="h-6 w-6"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </IconButton> */}
      </div>
      <MobileNav open={openNav}>
        {/* {navList} */}
        {!token && token !== "" && token !== undefined ? (
          <Button variant="gradient" size="sm" fullWidth className="mb-2">
            <span>Register</span>
          </Button>
        ) : (
          <Button variant="gradient" size="sm" fullWidth className="mb-2">
            <span>Log out</span>
          </Button>
        )}
      </MobileNav>
    </MDBNavbar>
  );
}
