import React, { useEffect, useState } from "react";
import Navbar from "../userContainerUtils/Navbar/navbar";
import "./dashboard.css";
import QuizList from "./QuizContainer/Quizzes";
import QuizView from "./QuizContainer/QuizView";
import { Client } from "../../../Client/GraphQLClient";
import Sidebar from "../userContainerUtils/Sidebar/Sidebar";
import { useLocation } from "react-router-dom";

function MentorDashboard({children}) {
  console.log("entered to metor");
  
  const user = JSON.parse(localStorage.getItem("currentUser"));
  const [quizzes, setQuizzes] = useState([]);
  const [quiz, setQuiz] = useState(null);
  const [top,setTop] = useState(null)
  const [qLen,setQLen] = useState(0)
  const [searches,setSearches] = useState([])
  const loc = useLocation()
  const handleQuiz = async (id) => {
    const FETCH_QUIZ_MUTATION = `
        query fetchQuiz($id: ID!)
        {
          getQuizById(id:$id){
            id
            name
            description
            sourceFileUrl
            createdAt
            ecryptedSrcFileUrl
          }
        }   
    `;

    try {
      const response = await Client(FETCH_QUIZ_MUTATION,{id})
      setQuiz(response?.data?.getQuizById)
    } catch (error) {
      console.log(`error: ${error}`);
      
    }
  };
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
      const quiz_list = response.data.allQuizzes
      setQuizzes(quiz_list);
      setTop(quiz_list[0])
      setQLen(quiz_list.length)
    } catch (error) {
      console.error("Failed to fetch quizzes:", error);
    }
  };
 const handleSearch = (reses)=>{
  setSearches(reses)
  
 }

  useEffect(() => {
    
    fetchQuizzes();
   
  }, []);
  
  
  return (
    <div className="main-container">
      <div className="nav-side">
        <div className="main-content">
          <Navbar username={user?.username} />
          <div className="mentor-body-content">
            {searches.length>0?<Sidebar quizzes={searches } onQuiz={handleQuiz} />:<Sidebar quizzes={quizzes } onQuiz={handleQuiz} />}
            
            {children?children:<QuizView quiz={quiz||top} top={quizzes} refetchQuizzes={fetchQuizzes} onHandleSearch={handleSearch}/>}
            
            
          </div>
        </div>
      </div>
    </div>
  );
}

export default MentorDashboard;
