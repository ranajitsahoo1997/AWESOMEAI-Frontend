import React, { useEffect, useState } from "react";
import "./sidebar.css";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";
import { ChevronDown, ChevronRight, Folder, FileText } from "lucide-react";
import QuizItem from "../../DashBoardContainer/QuizContainer/QuizItem";
import { useNavigate } from "react-router-dom";

function Sidebar({ quizzes, onQuiz }) {
  const [show, setShow] = useState(false);
  const [isOpen1, setIsOpen1] = useState(false);
  const [isOpen2, setIsOpen2] = useState(true);
  const navigate = useNavigate();

  const handleClick = (e) => {
    setShow(!show);
  };

  console.log(quizzes);
  const handleCreateresource = () => {
    navigate("/mentor-dashboard/create-resource");
  };
  const handleCreateQuestion = () => {
    navigate("/mentor-dashboard/Create-Question");
  };

  return (
    <div className="sidebar">
      <div>
        <div className="top">
          <h5>A</h5>
          {show ? (
            <FaArrowAltCircleLeft onClick={handleClick} />
          ) : (
            <FaArrowAltCircleRight onClick={handleClick} />
          )}
        </div>
        <hr />
        <div className="side-content">
          <div style={{ marginLeft: "5px", cursor: "pointer" }}>
            <div onClick={() => setIsOpen1(!isOpen1)}>
              {isOpen1 ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
              <span className="fw-bold">Create</span>
            </div>
            {isOpen1 && (
              <div style={{ marginLeft: "20px" }}>
                <div className="btn-text" onClick={handleCreateQuestion}>Create Question</div>
                <div className="btn-text" onClick={handleCreateresource}>Create Resouce</div>
              </div>
            )}
          </div>

          <div style={{ marginLeft: "5px", cursor: "pointer" }}>
            <div onClick={() => setIsOpen2(!isOpen2)}>
              {isOpen2 ? <ChevronDown size={16} /> : <ChevronRight size={16} />}

              <span className="fw-bold">Resources</span>
            </div>
            {isOpen2 && (
              <div
                style={{
                  marginLeft: "20px",
                  overflowY: "scroll",
                  height: "400px",
                }}
              >
                {quizzes ? (
                  quizzes.map((quiz, index) => (
                    <QuizItem key={index} quiz={quiz} onQuiz={onQuiz} />
                  ))
                ) : (
                  <div>
                    <p>Please Add Resouce</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
