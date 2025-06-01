import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Client } from "../../../Client/GraphQLClient";
import "../DashBoardContainer/StudentDashboard.css";
import PdfViewer from "../DashBoardContainer/ResourceContainer/PdfViewer";

function MyResourceView() {
  const [searchParams] = useSearchParams();
  const resId = searchParams.get("resId");
  const [resource, setResource] = useState(null);
  const [quests, setQuests] = useState([]);
  const [showQuestion, setShowQuestion] = useState(true);
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  console.log(resId);
  const navigate= useNavigate()

  const handleAttendClick = async (e,questionId) => {
    console.log(questionId,currentUser.id)
    const CREATE_MY_QUESTIONS_MUTATIONS = `
        mutation CreateMyQuestion($questionId: Int!,$studentId: ID!)
        {
          createMyQuestions(questionId:$questionId,studentId:$studentId)
          {
            success
            errors
            myQuestion{
              id
              questionText
              status
              marks
              startedAt
              isOpen
              question{
                id
              }
              student{
                id
              }
              
            }
          }
        }
      `;

      try {
        const studentId = currentUser?.id
        const {data} = await Client(CREATE_MY_QUESTIONS_MUTATIONS,{questionId,studentId})
        console.log(data);
        if (data?.createMyQuestions.success) {
          const myQuestion = data?.createMyQuestions.myQuestion
          navigate("/myQuestionView",{state:{myQuestion: myQuestion}})
        }
        
      } catch (error) {
        console.log(error);
        
      }
  };

  const handleResourceClickForAssign = async () => {
    setShowQuestion(false);
    const FETCH_QUESTIONS_FOR_RESOURCE = `
        query FetchQuestionForResId($resId: ID!)
        {
            fetchQuestionsForResourceId(resId: $resId){
                id 
                question
            }
        }
    `;
    try {
      const { data } = await Client(FETCH_QUESTIONS_FOR_RESOURCE, { resId });
      const questions = data?.fetchQuestionsForResourceId;
      console.log(questions);
      setQuests(questions);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchResource = async () => {
    const FETCH_RESOURCE_MUTATION = `
                query fetchResource($id: ID!)
                {
                  getResourceById(id:$id){
                    id
                    name
                    description
                    sourceFileUrl
                    createdAt
                    ecryptedSrcFileUrl
                  }
                }   
            `;

    try {
      const response = await Client(FETCH_RESOURCE_MUTATION, { id: resId });
      setResource(response?.data?.getResourceById);
    } catch (error) {
      console.log(`error: ${error}`);
    }
  };

  useEffect(() => {
    fetchResource();
  }, [quests]);

  return (
    <div className="student-dashboard">
      <div className="dashboard-container">
        <div className="row">
          <div className="col-sm-6 resource-view">
            <div className="res-view-container">
              <div className="">
                <div className=" res-text">
                  <div className="res-headerpart">
                    <div>
                      Resource:{" "}
                      <span style={{ color: "black" }}>{resource?.name} </span>
                    </div>
                    <div>
                      <button
                        className={`showQuestion-btn`}
                        style={{ display: showQuestion ? "block" : "none" }}
                        onClick={handleResourceClickForAssign}
                      >
                        Show Questions
                      </button>
                    </div>
                  </div>
                </div>
                <div className=" res-desc">
                  <div>
                    Description:{" "}
                    <div style={{ color: "black" }}>
                      {resource?.description}
                    </div>
                  </div>
                </div>
                <div className="res-content">
                  <div>
                    {resource?.sourceFileUrl?.endsWith(".pdf") ? (
                      <PdfViewer fileUrl={resource?.ecryptedSrcFileUrl} />
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-6 quest-view">
            <div className="quest-view-container">
              {console.log(quests)}
              {quests.length > 0 ? (
                quests?.map((quest) => (
                  <div className="question-view">
                    <div className="question-text">{quest.question}</div>
                    <div>
                      <button
                        className="attend-btn"
                        onClick={(e)=>handleAttendClick(e,quest.id)}
                      >
                        Attend
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="nothing-box">
                  <div>
                    Mentor hasn't generated Questiosn for this <b>Resource</b>.
                    <br />
                    or
                    <br />
                    There is no Questions created for this <b>Resource</b>
                    <br />
                    or
                    <br />
                    To show All Question please click on the{" "}
                    <b>
                      <i>"Show Questions"</i>
                    </b>{" "}
                    <b>button</b>
                  </div>
                </div>
              )}
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

export default MyResourceView;
