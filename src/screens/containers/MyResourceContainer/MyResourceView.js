import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Client } from "../../../Client/GraphQLClient";
import "../DashBoardContainer/StudentDashboard.css";
import PdfViewer from "../DashBoardContainer/ResourceContainer/PdfViewer";

function MyResourceView() {
  const [searchParams] = useSearchParams();
  const resId = searchParams.get("resId");
  const [resource, setResource] = useState(null);
  const [quests, setQuests] = useState([]);
  console.log(resId);

  const handleResourceClickForAssign = async () => {
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
                      Resource: <span>{resource?.name} </span>
                    </div>
                    <div>
                      <button
                        className="subscribe-btn"
                        onClick={handleResourceClickForAssign}
                      >
                        Self-Asign Resource
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
          <div className="col-sm-6 resource-view">
            <div className="quest-view-container">
                {console.log(quests)
                }
              {quests.length > 0 ? (
                quests?.map((quest)=>(
                    <div className="question-view">{quest.question}</div>
                ))
              ) : (
                <div className="nothing-box">
                  
                  <div>Mentor hasn't generated Questiosn for this <b>
                    Resource 
                  </b>.
                  <br />
                  or
                  <br />
                  There is no Questions created for this <b>Resource</b>
                  <br />
                  or
                  <br/>
                  To show All Question please click on the <b><i>"Self-Assign Resource"</i></b> <b>button</b></div>
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
