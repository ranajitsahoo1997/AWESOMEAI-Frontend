import React, { useEffect, useState } from "react";
import "./StudentDashboard.css"; // Import your CSS file
import { useNavigate } from "react-router-dom";
import { Client } from "../../../Client/GraphQLClient";
import { IoPersonCircleOutline } from "react-icons/io5";

function StudentDashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("currentUser"));
  console.log(user, "student");

  const [mentorIds, setMentorIds] = useState([]);
  const [resources, setResources] = useState([]);
  let [mentors, setMentors] = useState([]);
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
  const fetchSubScribedMentorsResources = async (idsList) => {
    const SUBSCRIBED_MENTORS_RESOURCE_QUERY = `
      query SubscribedMentorResources($idsList: [Int!]!)
      {
        subscribedMentorsResources(idsList: $idsList){
          id
          name
          description
          sourceFileUrl
          ecryptedSrcFileUrl
        }
      }
    `;
    try {
      const { data } = await Client(SUBSCRIBED_MENTORS_RESOURCE_QUERY, {
        idsList,
      });
      const resss = data?.subscribedMentorsResources;
      setResources(resss);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchSubscribedMentorIDs = async () => {
    const MENTOR_IDS_QUERY = `
        query MentorIds($studentId: String!){
            allSubscribedMentorIds(studentId: $studentId)
        }
    `;
    try {
      const studentId = user?.id;
      console.log(studentId);

      const { data } = await Client(MENTOR_IDS_QUERY, { studentId });

      const ids = data?.allSubscribedMentorIds;
      console.log(ids);
      fetchSubScribedMentorsResources(ids);
      setMentorIds(ids);
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  };

  const fetchMentors = async () => {
    const MENTORS_QUERY = `
    query MentorsQuery{
     allMentors{
        id
        username
      
      }
    }
  `;
    try {
      const response = await Client(MENTORS_QUERY);
      mentors = response?.data?.allMentors;
      console.log(response);

      setMentors(mentors);
    } catch (err) {
      console.log(`Error ${err}`);
    }
  };

  const handleUnSubscribe = async (mentor_id, student_id) => {
    console.log(mentor_id, student_id);
  };
  const handleSubscribe = async (mentor_id, student_id) => {
    console.log(mentor_id, student_id);
    const SUBSCRIBE_QUERY = `
      mutation SubscribeMentor($mentor_id: Int!,$student_id: ID!)
      {
        subscribeMentor(mentorId: $mentor_id,studentId: $student_id)
        {
            success
            errors
            
          }
      }
    
    `;
    try {
      const { data } = await Client(SUBSCRIBE_QUERY, { mentor_id, student_id });
      console.log(data.subscribeMentor);

      if (data.subscribeMentor.success) {
        fetchSubscribedMentorIDs();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMentors();
    fetchSubscribedMentorIDs();
  }, []);

  console.log(mentors);

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
            <div className="col-sm-3 pending-resource">
              <div className="pending-box1">
                <div className="headings">Search mentors here</div>
                {mentors &&
                  mentors.map((mentor) => {
                    return (
                      <div key={mentor.id} className="mentors-item">
                        <div className="subscribe-item">
                          <div>
                            <IoPersonCircleOutline className="mentor-icon" />
                          </div>
                          {mentor.username}
                        </div>
                        {mentorIds.includes(Number(mentor.id)) ? (
                          <button
                            onClick={() =>
                              handleUnSubscribe(mentor.id, user?.id)
                            }
                            className="subscribe-btn"
                          >
                            Unsubscribe
                          </button>
                        ) : (
                          <button
                            onClick={() => handleSubscribe(mentor.id, user?.id)}
                            className="subscribe-btn"
                          >
                            Subscribe
                          </button>
                        )}
                      </div>
                    );
                  })}
              </div>
              <div className="pending-box2">
                <div className="headings">Something here</div>
              </div>
            </div>

            <div className="col-sm-9 ">
              <div className="row ">
                <div className="col-sm-7 ">
                  <div className="row attended-box-score-box">
                    <div className="col-sm-8 attended-box">
                      <div className="attended-box-content"></div>
                    </div>
                    <div className="col-sm-4 attended-box">
                      <div className="attended-box-content"></div>
                    </div>
                  </div>
                  <div className="row connected-mentors">
                    <div className="mentors-box"></div>
                  </div>
                  <div className="row top-student-container">
                    <div className="top-student-list">
                      <div className="top-s-item"></div>
                      <div className="top-s-item"></div>
                      <div className="top-s-item"></div>
                      <div className="top-s-item"></div>
                      <div className="top-s-item"></div>
                      <div className="top-s-item"></div>
                      <div className="top-s-item"></div>
                      <div className="top-s-item"></div>
                      <div className="top-s-item"></div>
                      <div className="top-s-item"></div>
                      <div className="top-s-item"></div>
                      <div className="top-s-item"></div>
                      <div className="top-s-item"></div>
                      <div className="top-s-item"></div>
                      <div className="top-s-item"></div>
                      <div className="top-s-item"></div>
                      <div className="top-s-item"></div>
                      <div className="top-s-item"></div>
                      <div className="top-s-item"></div>
                      <div className="top-s-item"></div>
                      <div className="top-s-item"></div>
                      <div className="top-s-item"></div>
                      <div className="top-s-item"></div>
                      <div className="top-s-item"></div>
                      <div className="top-s-item"></div>
                      <div className="top-s-item"></div>
                      <div className="top-s-item"></div>
                      <div className="top-s-item"></div>
                      <div className="top-s-item"></div>
                      <div className="top-s-item"></div>
                      <div className="top-s-item"></div>
                      <div className="top-s-item"></div>
                      <div className="top-s-item"></div>
                      <div className="top-s-item"></div>
                    </div>
                  </div>
                  <div className="row bottom-box">
                    <div className="col-sm-6 top-resource">
                      <div className="top-resource-content"></div>
                    </div>
                    <div className="col-sm-6 top-resource">
                      <div className="top-resource-content"></div>
                    </div>
                  </div>
                </div>
                <div className="col-sm-5 mentors-post-container">
                  <div className="mentor-post-box">
                    <div className="headings">Resources Here</div>
                    <div className="resource-list">
                      {resources
                        ? resources.map((resource) => (
                            <div key={resource.id}>
                              <div className="resource-item">
                                {" "}
                                <div className="resource-item-text">
                                  {resource.name}
                                </div>
                                <div>
                                  <a href={`resourceView/?resId=${resource.id}`} className="subscribe-btn">View</a>
                                </div>
                              </div>
                              <hr style={{ margin: "10px 5px" }} />
                            </div>
                          ))
                        : "Subscribe to Mentors to avail resources"}
                    </div>
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
