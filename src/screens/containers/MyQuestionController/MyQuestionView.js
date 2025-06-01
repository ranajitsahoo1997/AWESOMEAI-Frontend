import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "../DashBoardContainer/StudentDashboard.css";
import { Client } from "../../../Client/GraphQLClient";
import MyAnswerView from "./MyAnswerView";

function MyQuestionView() {
  const location = useLocation();
  const myQuestion = location.state?.myQuestion;
  console.log(myQuestion);
  const [showAnsweerSheet, setShowAnsweerSHeet] = useState(false);
  const [answer, setAnswer] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [myQuestionSubmissionID, setMyQuestionSubmissionID] = useState(null);
  const [showAnswer, setShowAnswer] = useState(null);

  const date = new Date(myQuestion.startedAt);
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
    timeZoneName: "short",
  };
  const formatted = date.toLocaleString("en-US", options);
  console.log(formatted);

  const handleAttendQuestion = async () => {
    const UPDATE_MY_QUESTION_STATUS_MUATATION = `
            mutation UpdateMyQuestionStatus($myQuestionId: ID!,$questionText: String!,$isOpen:Boolean!) {
            updateMyQuestionsStatus(myQuestionId: $myQuestionId, questionText: $questionText, isOpen: $isOpen) {
                success
                errors
            }     
            }

    `;
    try {
      const myQuestionId = myQuestion.id;
      const questionText = myQuestion.questionText;
      const isOpen = myQuestion.isOpen; // Assuming you want to set it to true when attending the question
      const { data } = await Client(UPDATE_MY_QUESTION_STATUS_MUATATION, {
        myQuestionId,
        questionText,
        isOpen,
      });
      console.log(data);

      if (data?.updateMyQuestionsStatus?.success) {
        console.log("My question status updated successfully");
        setShowAnsweerSHeet(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitted answer:", answer);

    const MY_QUESTION_SUBMMISSION_MUTATION = `
        mutation MyQuestionSubmission($myQuestionId: ID!,$answer: String!)
        {
            createMyQuestionSubmission(myQuestionId: $myQuestionId,answer: $answer)
            {
            success
            errors
            myQuestionSubmission{
                id
                submittedAnswer
                myQuestion{
                id
                questionText
                status
                marks
                }
            }
            }
        }
    `;
    try {
      const { data } = await Client(MY_QUESTION_SUBMMISSION_MUTATION, {
        myQuestionId: myQuestion.id,
        answer,
      });
      console.log(data);

      if (data?.createMyQuestionSubmission?.success) {
        console.log("My question submission successful");
        setMyQuestionSubmissionID(
          data.createMyQuestionSubmission.myQuestionSubmission.id
        );
        setAnswer("");
        setSubmitted(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleGenerateAnswerSheet = async () => {
    const GENERATE_ANSWER_SHEET_MUTATION = `
        mutation GenerateAnswerSheet($myQuestionID: ID!, $myQuestionSubmissionID: ID!){
            generateAnswerSheet(myQuestionId: $myQuestionID, myQuestionSubmissionId: $myQuestionSubmissionID)
            {
                success
                errors
            }
        }
    
    `;

    const myQuestionID = myQuestion.id;

    try {
      const { data } = await Client(GENERATE_ANSWER_SHEET_MUTATION, {
        myQuestionID,
        myQuestionSubmissionID,
      });
      console.log(data);

      if (data?.generateAnswerSheet?.success) {
        console.log("Answer sheet generated successfully");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleShowAnswerSheet = async () => {
    const SHOW_ANSWER_SHEET_QUERY = `
        query ShowAnswerSheet($myQuestionId:ID!)
        {
              getSubmissionResultFromMyQuestion(myQuestionId: $myQuestionId){
                id
                question
                answer
                marks
                expectedLength
                actualLength
                similarityScore
                justification
                missingElements
                llmEvaluationScore
                finalScore
              }
       }
    
    `;
    try {
      const { data } = await Client(SHOW_ANSWER_SHEET_QUERY, {
        myQuestionId: myQuestion.id,
      });
      console.log(data);
      if (data?.getSubmissionResultFromMyQuestion) {
        setShowAnswer(data.getSubmissionResultFromMyQuestion);
        setShowAnsweerSHeet(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="student-dashboard">
      <div className="dashboard-container">
        <div className="qa-page">
          <div className="question-page">
            <div>
              <div>
                <h5>
                  <span>
                    <b>Question: </b>
                  </span>
                  <i>{myQuestion.questionText}</i>
                </h5>
              </div>
              <div className="question-details">
                <div>
                  <h5>
                    <span>
                      <b>Status: </b>
                    </span>
                    <i className="question-details-text">{myQuestion.status}</i>
                  </h5>
                </div>
                <div>
                  <h5>
                    <span>
                      <b>Marks: </b>
                    </span>
                    <i className="question-details-text">{myQuestion.marks}</i>
                  </h5>
                </div>
              </div>
              <div>
                <h5>
                  <span>
                    <b>Started At: </b>
                  </span>
                  <i className="question-details-text">{formatted}</i>
                </h5>
              </div>
            </div>
            <div>
              <h6>
                <b>
                  <i>All the best</i>
                </b>
              </h6>
            </div>
            <div className="ans-btn-container">
              {myQuestion.isOpen ? (
                <button className="answer-btn" onClick={handleAttendQuestion}>
                  Start Question
                </button>
              ) : (
                <button className="answer-btn" onClick={handleShowAnswerSheet}>
                  Show Answer Sheet
                </button>
              )}
            </div>
          </div>

          <div className="answer-page">
            {myQuestion.isOpen ? (
              showAnsweerSheet ? (
                <form className="answer-form" onSubmit={handleSubmit}>
                  <textarea
                    className="answer-sheet"
                    placeholder="Write your answer here..."
                    rows={5}
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    required
                  />

                  <div className="ans-btn-container">
                    {/* <div
                      onClick={handleGenerateAnswerSheet}
                      // disabled={!submitted}
                      className="answer-btn"
                    >
                      Generate Answer sheet
                    </div> */}
                    <button
                      type="submit"
                      className="answer-btn"
                      disabled={submitted}
                    >
                      Submit Answer
                    </button>
                  </div>
                </form>
              ) : (
                <p>
                  Click on <b>"attend-question"</b> button to attend this
                  question.
                </p>
              )
            ) : (
              <MyAnswerView showAnswer={showAnswer} />
            )}
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

export default MyQuestionView;
