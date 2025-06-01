import React, { useEffect, useState } from "react";
import Navbar from "../userContainerUtils/Navbar/navbar";
import "./dashboard.css";
import QuizList from "./ResourceContainer/Resources";
import QuizView from "./ResourceContainer/ResourceView";
import { Client } from "../../../Client/GraphQLClient";
import Sidebar from "../userContainerUtils/Sidebar/Sidebar";
import { useLocation, useNavigate } from "react-router-dom";
import QuestionItem from "../QuestionContainer/QuestionItem";
import QuestionView from "../QuestionContainer/QuestionsView";
import { IoSearch } from "react-icons/io5";
import { Button, Modal } from "react-bootstrap";

function MentorDashboard() {
  console.log("entered to metor");
  const [error, setError] = useState("");
  const [showQuest, setShowQuest] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [quizzes, setQuizzes] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [quiz, setQuiz] = useState(null);
  const [top, setTop] = useState(null);
  const [qLen, setQLen] = useState(0);
  const [searches, setSearches] = useState([]);
  const [studentList, setStudentList] = useState([]);
  const loc = useLocation();
  const [showGenerateQuestionModal, setShowGenerateQuestionModal] = useState(false);
  const [from,setFrom] = useState(1)
  const [to,setTo] = useState(2)
  const navigate = useNavigate();

  const fetchStudentList = async (resId) => {
    const FETCH_STUDENT_LIST_QUERY = `
      query FetchStudentList($resId: ID!) {
         fetchStudentsForResourceId(resId:$resId)
         {
          id 
          username
          email
         }
      }
    `;
    try {
      const { data } = await Client(FETCH_STUDENT_LIST_QUERY, { resId });
      const students = data?.fetchStudentsForResourceId;
      setStudentList(students);
    } catch (error) {
      console.error("Error fetching student list:", error);
    }
  };

  const handleResourceIcon = async (resId) => {
    console.log("respurce_id", resId);
    setShowQuest(true);
    const FETCH_QUESTIONS_FOR_RESOURCE = `
            query FetchQuestionForResId($resId: ID!)
            {
                fetchQuestionsForResourceId(resId: $resId){
                    id 
                    question
                    level
                    topic
                    mark
                    resource{
                    id
                    }
                }
            }
        `;
    try {
      const { data } = await Client(FETCH_QUESTIONS_FOR_RESOURCE, { resId });
      const quests = data?.fetchQuestionsForResourceId;
      console.log(quests);
      setQuestions(quests);
      await fetchStudentList(resId);
    } catch (error) {
      console.log(error);
    }
  };

  const handleQuiz = async (id) => {
    setShowQuest(false);
    const FETCH_QUIZ_MUTATION = `
        query fetchResource($id: ID!)
        {
          getResourceById(id:$id){
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
      const response = await Client(FETCH_QUIZ_MUTATION, { id });
      setQuiz(response?.data?.getResourceById);
    } catch (error) {
      console.log(`error: ${error}`);
    }
  };
  const fetchQuizzes = async () => {
    const QUIZZES_QUERY = `
      query {
        allResources {
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
      const quiz_list = response.data.allResources;
      setQuizzes(quiz_list);
      setTop(quiz_list[0]);
      setQLen(quiz_list.length);
    } catch (error) {
      console.error("Failed to fetch quizzes:", error);
    }
  };
  const handleSearch = (reses) => {
    setSearches(reses);
  };
  const handleCreateReourceClick = () => {
    console.log("entered");

    navigate("/create-resource");
  };
  const handleCreateQuestionClick = () => {
    navigate("/create-question");
  };

  const handleGenerateQuestion = async (resID,from,to) => {
    console.log("hello", resID);
    console.log("from==>",from);
    console.log("to==>",to);
    
    

    setError("");
    setLoading(true);
    const CREATE_QUESTION_QUERY = `
      query CreateQuestion($resId: ID!,$froms: Int!,$to: Int!)
      {
        createQuestionWithResource(resId: $resId,froms: $froms,to: $to)
        {
          id
          question
          level
          topic
          mark
          resource{
                id
                name
              }
        }
      }
    `;
    try {
      setError("");
      setLoading(true);

      const response = await Client(CREATE_QUESTION_QUERY, {
        resId: resID,froms: from,to: to
      });
      const questionData = response.data.createQuestionWithResource;
      setQuestions(questionData);
    } catch (error) {
      setError("Error in Creating question");
    } finally {
      setLoading(false);
    }
  };

  const handleGenFormSubmit = async (e,resId) =>{
    e.preventDefault()
    console.log("resid==>",resId)
    console.log("from==>",from);
    console.log("to==>",to);
    handleClose()
    await handleGenerateQuestion(resId,from,to)
    setFrom(1)
    setTo(2)
    
    
  }

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const handleClose = () => {
    setShowGenerateQuestionModal(false);
  };

  const handleShowGenerationQuestionModal = () => {
    setShowGenerateQuestionModal(true);
  };

  const handleSubmit = async (e) => {
    console.log(searchText);

    e.preventDefault();
    const SEARCH_QUERY = `
        query searchResources($searchText: String!){
          searchResourceByName(searchText: $searchText)
          {
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
      const all_quizzes = await Client(SEARCH_QUERY, { searchText });
      setSearches(all_quizzes.data.searchResourceByName);
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  };

  const handlebackClick = (val)=>{
    setShowQuest(val)
  }

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchText(value);

    if (!value) {
      setSuggestions([]);
      return;
    }
    if (value === "") {
      fetchQuizzes();
    }

    // Filter quiz names from props or global quiz list
    const filtered = quizzes.filter(
      (quiz) =>
        quiz.name.toLowerCase().includes(value.toLowerCase()) |
        quiz.description.toLowerCase().includes(value.toLowerCase())
    );
    setSuggestions(filtered || []);
  };

  return (
    <div className="main-container">
      <div className="nav-side">
        <div className="main-content">
          <Navbar />
          <div className="mentor-body-content">
            {/* {searches.length>0?<Sidebar quizzes={searches } onQuiz={handleQuiz} />:<Sidebar quizzes={quizzes } onQuiz={handleQuiz} />} */}
            {searches.length > 0 ? (
              <QuizList
                quizzes={searches}
                onQuiz={handleQuiz}
                onResourceIcon={handleResourceIcon}
              />
            ) : (
              <QuizList
                quizzes={quizzes}
                onQuiz={handleQuiz}
                onResourceIcon={handleResourceIcon}
              />
            )}
            <div className="quiz_view">
              <div className="row top-container m-0 p-0">
                <div className="col-md-6 search-btn-container">
                  <form onSubmit={handleSubmit}>
                    <input
                      type="search"
                      placeholder="Search Resource here..."
                      onChange={handleInputChange}
                      value={searchText}
                      on
                    />
                    <button type="submit">
                      <IoSearch />
                    </button>
                    {suggestions.length > 0 && (
                      <ul className="suggestion-list">
                        {suggestions.map((s, index) => (
                          <li
                            key={index}
                            style={{ padding: "8px", cursor: "pointer" }}
                            onClick={() => {
                              setSearchText(s.name);
                              setSuggestions([]);
                            }}
                          >
                            {s.name}
                          </li>
                        ))}
                      </ul>
                    )}
                  </form>
                </div>
                <div className="col-md-6 ">
                  <div className="row">
                    <div className="col-md-6 res-text-container">
                      <h5>
                        <b style={{ color: "rebeccapurple" }}>Resource: </b>
                        {quiz?.name || top?.name}
                      </h5>
                    </div>
                    <div className="col-md-6 gen-btn-container">
                      <div className="text-center">
                        <div
                          className="gen-btn"
                          onClick={
                            // handleGenerateQuestion(quiz?.id || top?.id)
                            handleShowGenerationQuestionModal
                          }
                        >
                          Generate Questions
                        </div>
                        <Modal
                          show={showGenerateQuestionModal}
                          onHide={handleClose}
                          centered
                        >
                          <form onSubmit={(e)=>handleGenFormSubmit(e,quiz?.id||top?.id)}>
                            <Modal.Header style={{ color: "red" }} closeButton>
                              <Modal.Title>
                                Generate Question For{" "}
                                <b>{quiz?.name || top?.name}</b>
                              </Modal.Title>
                            </Modal.Header>

                            <Modal.Body>
                              <div className="">
                                <label>Enter <b>From</b> and <b>To</b> page numbers, It will created questions from those pages only</label>

                                <div className="row gap-5">
                                  <input
                                  type="number"
                                  className="input-box col-md-5"
                                  placeholder="Enter From Page Number"
                                  onChange={(e) => setFrom(e.target.value)}
                                  value={from}
                                  required
                                />
                                <input
                                  type="number"
                                  className="input-box col-md-5"
                                  placeholder="Enter To Page Number"
                                  onChange={(e) => setTo(e.target.value)}
                                  value={to}
                                  required
                                />
                                </div>
                              </div>
                            </Modal.Body>
                            <Modal.Footer>
                              <Button variant="secondary" onClick={handleClose}>
                                Cancel
                              </Button>
                              <Button
                                type="submit"
                                variant="primary"
                                // onClick={() =>
                                //   handleGenerateQuestion(quiz?.id || top?.id)
                                // }
                              >
                                Submit
                              </Button>
                            </Modal.Footer>
                          </form>
                        </Modal>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {showQuest ? (
                <div>
                  {loading && (
                    <p>Loading... it will take some time to generate</p>
                  )}
                  {error && <p>{error}</p>}
                  {questions && (
                    <QuestionView
                      questions={questions}
                      studentList={studentList}
                      handlebackClick = {handlebackClick}
                    />
                  )}
                </div>
              ) : (
                <QuizView
                  quiz={quiz || top}
                  top={quizzes}
                  refetchQuizzes={fetchQuizzes}
                  searchText={searchText}
                  handleResourceIcon={handleResourceIcon}
                />
              )}
            </div>

            <button
              className="float-button float-button1-position"
              onClick={handleCreateReourceClick}
            >
              Create Resource
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MentorDashboard;
