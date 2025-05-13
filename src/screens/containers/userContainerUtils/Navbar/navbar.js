import React, { useState } from "react";
import "./navbar.css";
import { useNavigate } from "react-router-dom";

function Navbar({ username }) {
  const navigate = useNavigate()
  const handleClick = () =>{
    
    navigate("/mentor-dashboard/create-resource")
  }

  return (
    <nav className="navbar ">
      <div className="container-fluid">
        <div className="">Welcome back Mr./Mrs {username.toUpperCase()}!</div>

        <div className="bg-info">
          <button  className="btn btn-info" onClick={handleClick}>Create Resource</button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
