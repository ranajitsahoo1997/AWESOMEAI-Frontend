import React, { useEffect, useState } from "react";
import { FaTableList } from "react-icons/fa6";

function QuizItem({ quiz, onQuiz,onResourceIcon }) {
  const handleClick = (id) => {
    onQuiz(id);
  };
  const handleIconClick = (id)=>{
    onResourceIcon(id)
  }
  return (
    <div className="1">
     
        <div className="resource-item-name row " >
          
          
          <div className="col-md-10" onClick={() => handleClick(quiz?.id)}>{quiz?.name}</div>
          <div className="col-md-2 "  onClick={() => handleIconClick(quiz?.id)} > <FaTableList/></div>
        </div>
      
    </div>
  );
}

export default QuizItem;
