import React from "react";
import { useLocation } from "react-router-dom";
import MyAnswerView from "../MyQuestionController/MyAnswerView";
import RoundProgressBar from "../MyQuestionController/RoundProgressBar";
import StaticProgressBar from "../MyQuestionController/StaticProgressBar";

function GeneratedAnswerView() {
  const location = useLocation();
  const { genAns, submissionId } = location.state || {};
  console.log(genAns);
  console.log(submissionId);

  return (
    <div className="mentor-ans-view">
      <div className="row">
        <div className="col-sm-6 p-4">
          <p>
            <b>Question: </b>
            {genAns.question}
          </p>
          <p>
            <b>Marks: </b>
            {genAns.marks}
          </p>
        </div>
        <div className="col-sm-6 p-4 text-justify">
          <p>
            <b>Student's Answer: </b>
            <i>{genAns.answer}</i>
          </p>
        </div>
      </div>
      <div className="row">
        <div className="col-md-3">
          <p className="text-center fw-bold">Words Required</p>
          <hr />
          <div
            style={{
              width: "100%",
              height: "10vh",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <RoundProgressBar
              max={genAns.expectedLength}
              value={genAns.actualLength}
            />
          </div>
        </div>
        <div className="col-md-3">
          <p className="text-center fw-bold">Similarity Score</p>
          <hr />
          <div
            style={{
              width: "100%",
              height: "10vh",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <StaticProgressBar value={genAns.similarityScore} max={1} />
          </div>
        </div>
        <div className="col-md-3">
          <p className="text-center fw-bold">LLM Evaluated Score</p>
          <hr />
          <div
            style={{
              width: "100%",
              height: "10vh",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <RoundProgressBar max={100} value={genAns.llmEvaluationScore} />
          </div>
        </div>
        <div className="col-md-3 ">
          <p className="text-center fw-bold">Final Score</p>
          <hr />
          <div
            style={{
              width: "100%",
              height: "10vh",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <RoundProgressBar max={100} value={genAns.finalScore} />
          </div>
        </div>
      </div>
      <div className="p-5">
        <div className="feed-back-container">
          <div className="feedback">
            <p>Justification</p>
          </div>
          <div style={{ textAlign: "justify", padding: "10px" }}>
            {genAns.justification}
          </div>
        </div>
        {genAns.missingElements && (
          <div className="feed-back-container">
            <div className="feedback">
              <p>Missing Elements</p>
            </div>
            <div style={{ textAlign: "justify", padding: "10px" }}>
              {genAns.missingElements}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default GeneratedAnswerView;
