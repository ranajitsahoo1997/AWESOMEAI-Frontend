import React from "react";
import "../DashBoardContainer/StudentDashboard.css";
import RoundProgressBar from "./RoundProgressBar";
import StaticProgressBar from "./StaticProgressBar";

function MyAnswerView({ showAnswer }) {
  return (
    <div className="answer-view">
      {showAnswer ? (
        <div>
          <div className="QM-view">
            <div className="question">{showAnswer.question}</div>
            <div className="markquestion">
              <p>
                Marks:{" "}
                <b>
                  <i>{showAnswer.marks}</i>
                </b>
              </p>
            </div>
          </div>
          <hr />
          <div className="your-answer">
            <p>
              <b style={{color: "green"}}>Your Answer: </b> <i>{showAnswer.answer}</i>
            </p>
          </div>
          <hr style={{ color: "rebeccapurple", fontWeight: "bold" }} />
          <div style={{ textAlign: "center" }}>
            <b style={{ color: "rebeccapurple" }}>Generated Result From AI</b>
          </div>
          <div className="progress-bar-container">
            <RoundProgressBar
              max={100}
              value={showAnswer.finalScore}
            />
            <div style={{ width: "70%" ,marginLeft: "20px"}}>
              <StaticProgressBar
                Text={"Similarity Score"}
                value={showAnswer.similarityScore}
                max={1}
              />
              <StaticProgressBar
                Text={"LLM Evaluation Score"}
                value={showAnswer.llmEvaluationScore}
                max={100}
              />
              <StaticProgressBar
                Text={"Words Count"}
                value={showAnswer.actualLength}
                max={showAnswer.expectedLength}
              />
            </div>
          </div>
          <div className="feed-back-container">
            <div className="feedback">
              <p>Justification</p>
              
            </div>
            <div style={{textAlign: "justify",padding:"10px"}}>{showAnswer.justification}</div>
          </div>
          {showAnswer.missingElements&&<div className="feed-back-container">
            <div className="feedback">
              <p>Missing Elements</p>
              
            </div>
            <div style={{textAlign: "justify",padding:"10px"}}>{showAnswer.missingElements}</div>
          </div>}
          
          
          
        </div>
      ) : (
        "No Answer Available"
      )}
    </div>
  );
}

export default MyAnswerView;
