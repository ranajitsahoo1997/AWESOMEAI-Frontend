import React, { useState } from "react";
import "./navbar.css";
import { useNavigate } from "react-router-dom";
import { Client } from "../../../../Client/GraphQLClient";

function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("currentUser"));
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const handleClick = async() => {
    setError("");
    setLoading(true);
    const LOGOUT_MUTATION = `
        mutation Logout($refreshToken: String!){
          logout(refreshToken: $refreshToken){
            success
            errors}
        }
    `;
    const refreshToken = localStorage.getItem("refreshToken");
    try {
      const response = await Client(LOGOUT_MUTATION,{refreshToken});
      if(response.data.logout.success){
        localStorage.clear();
        setLoading(false);
        navigate("/");
      }
    } catch (error) {
      console.log(error)
      setLoading(false)
      setError("Error in Logging out")
    }
  };

  return (
    <nav className="navbar ">
      <div className="container-fluid">
        <div className=""><b>Welcome back Mr./Mrs {user?.username.toUpperCase()}!</b></div>

        <div className="">
          <button style={{ backgroundColor: "rebeccapurple", color: "white" }} className="btn  fw-bold" onClick={handleClick}>
            {loading? "Logging out...":"Logout"}
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
