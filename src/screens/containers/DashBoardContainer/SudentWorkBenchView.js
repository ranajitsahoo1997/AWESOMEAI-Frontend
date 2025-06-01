import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Client } from "../../../Client/GraphQLClient";
import RoundProgressBar from "../MyQuestionController/RoundProgressBar";
import StaticProgressBar from "../MyQuestionController/StaticProgressBar";

function SudentWorkBenchView() {
  const [search] = useSearchParams();
  const studentId = search.get("id");
  const resId = search.get("resId");
  console.log("studentId", studentId);
  console.log("resId", resId);
  const [myQuestions, setMyQuestions] = React.useState([]);
  const [showAnswer, setShowAnswer] = useState([]);
  const [loading,setLoading] = useState(false)
  const [error,setError] = useState("")
  const navigate = useNavigate();
  const [showGenAnswer,setShowGenAnswer] = useState(null)

  const fetchMyQuestions = async (studentId, resId) => {
    const FETCH_MY_QUESTIONS_QUERY = `
        query FetchMyQuestions($studentId: ID!, $resId: ID!) {
          fetchMyQuestionsForResource(resId: $resId,studentId:$studentId)
           {
                id
                questionText
                status
                marks
                submission{
                id
                submittedAnswer
                submittedAt
                }
                startedAt
                endedAt
                
            }
        }
        `;
    try {
      const response = await Client(FETCH_MY_QUESTIONS_QUERY, {
        studentId,
        resId,
      });
      console.log("My Questions:", response.data.fetchMyQuestionsForResource);
      setMyQuestions(response.data.fetchMyQuestionsForResource);
    } catch (error) {
      console.error("Error fetching my questions:", error);
    }
  };

  const handleGenerateAnswerSheet = async (myQuestionID,myQuestionSubmissionID) =>{
    console.log(myQuestionID)
    console.log(myQuestionSubmissionID)
      setLoading(false)
      setError("")
      const GENERATE_ANSWER_SHEET_MUTATION = `
          mutation GenerateAnswerSheet($myQuestionID: ID!, $myQuestionSubmissionID: ID!){
              generateAnswerSheet(myQuestionId: $myQuestionID, myQuestionSubmissionId: $myQuestionSubmissionID)
              {
                  success
                  errors
              }
          }
      
      `;
  
      
      
  
      try {
        setLoading(true)
          const { data } = await Client(GENERATE_ANSWER_SHEET_MUTATION, {
              myQuestionID,
              myQuestionSubmissionID
          });
          console.log(data);
          
          if (data?.generateAnswerSheet?.success) {
            setLoading(false)
              console.log("Answer sheet generated successfully");
              
          }
      } catch (error) {
        setLoading(false)
        setError("Error in generating Answer Sheet")
          console.log(error);
          
      }
      finally{
        setLoading(false)
      }
    }
  

  const handleShowAnswer = async (myQuestionId) => {
    
    const SHOW_ANSWER_QUERY = `
    query getMyQuestionSubmiisionResult($myQuestionId: ID!)
    {
         getResultForSubmission(submissionId:$myQuestionId)
         {
            id
            question
            answer
            marks
            expectedLength
            actualLength
            similarityScore
            llmEvaluationScore
            finalScore
            justification
            missingElements
          }
     }
   
   `;

    try {
      const { data } = await Client(SHOW_ANSWER_QUERY, { myQuestionId });
      console.log(data.getResultForSubmission);
      const genAns = data.getResultForSubmission;
      setShowGenAnswer(genAns)
      // navigate("generatedAnswerView", {
      //   state: { genAns: genAns},
      // });
    } catch (error) {
      console.log(error);
    }
  };

  const handleShowSubmitAnswer = async (myQuestionId) => {
    setShowGenAnswer(null)
    const SHOW_ANSWER_QUERY = `
    query getMyQuestionSubmiisionResult($myQuestionId: ID!)
    {
        getMyQuestionSubmissionByMyQuestion(myQuestionId:$myQuestionId)
        {
             id
              submittedAnswer
              score
              submittedAt
              result
              {
                id
              }
              myQuestion
              {
                id
              }
                  
        }
    }
   
   `;

    try {
      const { data } = await Client(SHOW_ANSWER_QUERY, { myQuestionId });
      console.log(data.getMyQuestionSubmissionByMyQuestion);
      const genAns = data.getMyQuestionSubmissionByMyQuestion;
      setShowAnswer(genAns);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (studentId && resId) {
      fetchMyQuestions(studentId, resId);
    }
  }, [studentId, resId]);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-sm-5 ">
          <h3
            className="text-center p-3"
            style={{
              color: "rebeccapurple",
              fontWeight: "bold",
              borderBottom: "2px solid rebeccapurple",
            }}
          >
            My Questions
          </h3>
          <ul className="list-group my-questions-list">
            {myQuestions.map((question, index) => (
              <li key={question.id} className="list-group-item mb-2">
                <p>
                  <b>Q{index + 1}.</b> {question.questionText}
                </p>
                <p>
                  <b>Status:</b> {question.status}
                </p>
                <p>
                  <b>Marks:</b> {question.marks}
                </p>
                <p>
                  <b>StartedAt:</b> {question.startedAt}
                </p>
                <p>
                  <b>EndedAt:</b> {question.endedAt}
                </p>
                <div className="btn-container">
                  <button
                    className="btn btn-outline-success"
                    onClick={(e) => handleShowSubmitAnswer(question.id)}
                  >
                    show student's answer
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="col-sm-7 ">
          {showAnswer.length != 0 ? (
            <div className="answer-container">
              <div className="answer-text">
                <p>{showAnswer.submittedAnswer}</p>
              </div>
              <div className="ans-btn-time">
                <div>
                  <b>Submitted at: </b> {showAnswer.submittedAt}
                </div>
                <div>
                  {error&&<p style={{color: "red",fontWeight: "bold"}}>{error}</p>}
                  {showAnswer.result.length != 0 ? (
                    <button className="btn btn-outline-success fw-bold" onClick={(e)=>handleShowAnswer(showAnswer.id)}>
                      Show Generated Answer
                    </button>
                  ) : null}
                </div>
              </div>

              <div>

                {showGenAnswer?<div>
                  <div className="progress-bar-container">
            <RoundProgressBar
              max={100}
              value={showGenAnswer.finalScore}
            />
            <div style={{ width: "70%" ,marginLeft: "20px"}}>
              <StaticProgressBar
                Text={"Similarity Score"}
                value={showGenAnswer.similarityScore}
                max={1}
              />
              <StaticProgressBar
                Text={"LLM Evaluation Score"}
                value={showGenAnswer.llmEvaluationScore}
                max={100}
              />
              <StaticProgressBar
                Text={"Words Count"}
                value={showGenAnswer.actualLength}
                max={showGenAnswer.expectedLength}
              />
            </div>
          </div>
          <div className="feed-back-container">
            <div className="feedback">
              <p>Justification</p>
              
            </div>
            <div style={{textAlign: "justify",padding:"10px"}}>{showGenAnswer.justification}</div>
          </div>
          {showGenAnswer.missingElements&&<div className="feed-back-container">
            <div className="feedback">
              <p>Missing Elements</p>
              
            </div>
            <div style={{textAlign: "justify",padding:"10px"}}>{showGenAnswer.missingElements}</div>
          </div>}
          
          
                </div>:null}
              </div>
            </div>
            
          ) : (
            <p>Click on Show Question Answer</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default SudentWorkBenchView;
