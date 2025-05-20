import React, { useState } from "react";
import "./StudentDashboard.css"; // Import your CSS file
import { useNavigate } from "react-router-dom";
import { Client } from "../../../Client/GraphQLClient";

function StudentDashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("currentUser"));
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const handleClick = async () => {
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
      const response = await Client(LOGOUT_MUTATION, { refreshToken });
      if (response.data.logout.success) {
        localStorage.clear();
        setLoading(false);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError("Error in Logging out");
    }
  };






  return (
    <div className="student-dashboard">
      <div className="dashboard-container">
        <div className="dashboard-header">
          <div>
            <h4>Welcome to {user?.username}'s Dashboard</h4>
          </div>
          <div>
            <button
              style={{ backgroundColor: "rebeccapurple", color: "white" }}
              className="btn  fw-bold"
              onClick={handleClick}
            >
              {loading ? "Logging out..." : "Logout"}
            </button>
          </div>
        </div>
        <div className="dashboard-body">
          <div className="row">
            <div className="col-sm-2 pending-resource">
              <div className="pending-box1">search mentors for connection</div>
              <div className="pending-box2">Pending tasks</div>
            </div>
            
            <div className="col-sm-10 attended-box-score-box">
              <div className="row">
                <div className="col-sm-2 attended-box">
                  <div className="attended-box-content">already or continue resources</div>
                </div>
                <div className="col-sm-10 score-box-content">
                  <div className="score-box">score and other boxes</div>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-12 connected-mentors">
                  <div className="mentors-box">
                    connected mentors list
                  </div>
                </div>
                <div className="row bottom-box">
                  <div className="col-sm-4 suggestion-box">
                    <div className="suggestion-box-content">suggestion box</div>
                  </div>
                  <div className="col-sm-4 top-resource">
                    <div className="top-resource-content">top resources</div>
                  </div>
                  <div className="col-sm-4 improvment-resource">
                    <div className="improvment-resource-content">improvement resources</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="box-1"></div>
      <div className="box-2"></div>
      <div className="box-3"></div>
      <div className="box-4"></div>
    </div>
  );
}

export default StudentDashboard;
