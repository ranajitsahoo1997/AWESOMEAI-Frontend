import React, { useEffect, useState } from "react";
import "./question.css";
import { Client } from "../../../Client/GraphQLClient";
import { useNavigate } from "react-router-dom";

function CreateQuestion() {
  const [quizzes,setQuizzes] = useState([])
  const [selectedQuiz,setSelectedQuiz] = useState()
  const navigate = useNavigate()
  useEffect(()=>{
    const fetchQuizzes = async () => {
      const QUIZZES_QUERY = `
          query {
            allQuizzes {
              id
              name
              description
              sourceFileUrl
              ecryptedSrcFileUrl
              createdAt
            }
          }
        `;
      try {
        const response = await Client(QUIZZES_QUERY);
        const quiz_list = response.data.allQuizzes;
        setQuizzes(quiz_list);
      } catch (error) {
        console.error("Failed to fetch quizzes:", error);
      }
    };
    
    fetchQuizzes()
  },[])
  console.log(quizzes)
  const handleQuizChange = (e) => {
    setSelectedQuiz(e.target.value);
  };

  const [loading,SetLoading] = useState(false)
  const [error,SetError] = useState('')


  const handleSubmit= async(e)=>{
    e.preventDefault()
    const CREATE_QUESTION_QUERY = `
      query CreateQuestion($resId: ID!)
      {
        createQuestionWithResource(resId: $resId)
        {
          id
          text
          level
          topic
          mark
          quiz{
                id
                name
              }
        }
      }
    `;

    try {
      SetError('')
      SetLoading(true)

      const response = await Client(CREATE_QUESTION_QUERY,{resId: selectedQuiz});
      const questionData = response.data.createQuestionWithResource; 
      navigate('/questions', { state: { questions: questionData } });
    } catch (error) {
      SetError(error)
      SetLoading(false)
      console.log(`Error: ${error}`);
      
    }
    
  }

  return (
    <div className="create_question_container">
      <form onSubmit={handleSubmit}>
      <h1 htmlFor="quizSelect" className="text-center">Select a Resource</h1>
        <select className="select-content" id="quizSelect" value={selectedQuiz} onChange={handleQuizChange}>
          <optgroup label="Your Resources">
          <option value="">-- Select a Resource --</option>
          {quizzes.map(quiz => (
            <option key={quiz.id} value={quiz.id}>
              {quiz.name}
            </option>
            
          ))}
          </optgroup>
        </select>
        <div className="text-center">
        <button className="generate-btn" type="submit">{loading?"Generating Question....":"Generate With AI"}</button>
        </div>
      </form>
    </div>
  );
}

export default CreateQuestion;
