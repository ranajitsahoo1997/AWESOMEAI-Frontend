import React, { useEffect, useState } from "react";
import { Client } from "../../../../Client/GraphQLClient";
import QuizItem from "./ResourceItem";
import "./quiz.css";
// Your GraphQL request function

const QuizList = ({ onQuiz, onFirstQuiz,quizzes,onResourceIcon}) => {
  // const [quizzes, setQuizzes] = useState([]);
  // const [qLen,setQLen] = useState(0)
  // const [quiz, setQuiz] = useState(null);

  // const fetchQuizzes = async () => {
  //   const QUIZZES_QUERY = `
  //     query {
  //       allQuizzes {
  //         id
  //         name
  //         sourceFileUrl
  //         ecryptedSrcFileUrl
  //       }
  //     }
  //   `;
  //   try {
  //     const response = await Client(QUIZZES_QUERY);
  //     const quiz_list = response.data.allQuizzes;
  //     console.log("quizzes", quiz_list);

  //     setQuizzes(quiz_list);
  //     onFirstQuiz(quiz_list[0]);
  //   } catch (error) {
  //     console.error("Failed to fetch quizzes:", error);
  //   }
  // };

  // useEffect(() => {
  //   if (quizzes.length==0) {
  //     fetchQuizzes();
  //   }
    
    
  // }, [quizzes, onFirstQuiz]);

 
 

  return (
    <div className="resource-container">
      <div className="resources">

        {quizzes ? (
          quizzes.map((quiz) => (
            <QuizItem key={quiz.id} quiz={quiz} onQuiz={onQuiz} onResourceIcon={onResourceIcon} />
          ))
        ) : (
          <p>Please Add Resouce</p>
        )}
      </div>
    </div>
  );
};

export default QuizList;
