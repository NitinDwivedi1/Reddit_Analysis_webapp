import { useState } from "react";
import { Input, Select, Option, Button } from "@material-tailwind/react";
import { Link, Navigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Register() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  console.log(token);
  const [data, setdata] = useState({
    fullname: "",
    emailid: "",
    occupation: "",
    purpose: "",
    password: "",
    confirmPass: "",
  });
  let msg = "";

  const handleChange = (e) => {
    const { name, value } = e.target;

    setdata({ ...data, [name]: value });
  };
  const handleOccupationChange = (e) => {
    const { occupation } = data;
    setdata({ ...data, occupation: e });
  };
  const handlePurposeChange = (e) => {
    const { purpose } = data;
    setdata({ ...data, purpose: e });
  };
  // console.log(data);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { purpose, confirmPass, emailid, fullname, occupation, password } =
      data;
    if (
      purpose != "" &&
      confirmPass != "" &&
      emailid != "" &&
      fullname != "" &&
      occupation != "" &&
      password != ""
    ) {
      if (password != confirmPass) {
        toast.error("Password and confirm password must be same!");
        return;
      }
      console.log("user data" + data);
      const response = await fetch("/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullname: data.fullname,
          emailid: data.emailid,
          occupation: data.occupation,
          purpose: data.purpose,
          password: data.password,
        }),
      });
      console.log("res==", response);
      const json = await response.json();
      console.log("json " + JSON.stringify(json));
      console.log(response);
      console.log(json.access_token);
      if (response.ok) {
        //   setdata(json);
        setToken(json.access_token);
        toast.success("Registered successfully");
        localStorage.setItem("token", json.access_token);
        msg = "Registered Successfully!";
      }
      else if(response.status==400){
        toast.error("Email already registered")
      }
    } 
    else {
      toast.error("All fields are required");
    }

    // fetchProducts()
  };
  // console.log(token);
  if (token != null) return <Navigate to="/" replace />;
  return (
    <div className="flex justify-center">
      <div className="border px-5 py-5 rounded-xl w-50">
        <ToastContainer />
        <br></br>
        <h2>Register</h2>
        <br></br>
        {msg.length > 0 && <p>{msg}</p>}
        <form onSubmit={handleSubmit}>
          <Input
            label="Fullname"
            name="fullname"
            value={data.fullname}
            onChange={handleChange}
            color="red"
          />
          <br></br>
          <Input
            label="Emailid"
            name="emailid"
            value={data.emailid}
            onChange={handleChange}
            color="red"
          />
          <br></br>
          <Select
            selected="e"
            label="Occupation"
            name="occupation"
            value={data.occupation}
            onChange={handleOccupationChange}
            color="red"
          >
            <Option value="Student">Student</Option>
            <Option value="Private Service">Private Service</Option>
            <Option value="Government Servic">Government Service</Option>
            <Option value="Business person">Business person</Option>
          </Select>
          <br></br>
          <Select
            label="Purpose"
            name="purpose"
            value={data.purpose}
            onChange={handlePurposeChange}
            color="red"
          >
            <Option value="For research work">For research work</Option>
            <Option value="For personal project">For personal project</Option>
            <Option value="For corporate project">For corporate project</Option>
            <Option value="Just to get insights and analysis">
              Just to get insights and analysis
            </Option>
            ~
          </Select>
          <br></br>
          <Input
            type="password"
            label="Password"
            name="password"
            value={data.password}
            onChange={handleChange}
            color="red"
          />
          <br></br>
          <Input
            type="password"
            label="Confirm Password"
            name="confirmPass"
            value={data.confirmPass}
            onChange={handleChange}
            color="red"
          />
          <br></br>
          <Button type="submit" color="red">Register</Button> <br />
          <br />
          <Link to="/login" style={{color:"red"}}>Already have an account ? Login</Link>
        </form>
        <br></br>
      </div>
    </div>
  );
}
