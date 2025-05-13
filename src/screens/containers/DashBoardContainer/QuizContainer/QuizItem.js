import React, { useEffect, useState } from "react";
import { FileText } from "lucide-react";

function QuizItem({ quiz, onQuiz }) {
  const handleClick = (id) => {
    onQuiz(id);
  };
  return (
    <div className="resource">
      <div >
        
        <p onClick={() => handleClick(quiz?.id)}><FileText className="mx-3"size={16}/>{quiz?.name}</p>
      </div>
    </div>
  );
}

export default QuizItem;
