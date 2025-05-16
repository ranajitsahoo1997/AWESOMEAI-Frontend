import React, { useEffect, useState } from "react";
import { FileText } from "lucide-react";

function QuizItem({ quiz, onQuiz }) {
  const handleClick = (id) => {
    onQuiz(id);
  };
  return (
    <div className="resource">
      <div >
        
        <div id="resource-item-name" onClick={() => handleClick(quiz?.id)}><FileText size={18}/><div>{quiz?.name}</div></div>
      </div>
    </div>
  );
}

export default QuizItem;
