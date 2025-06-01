import { useLocation } from "react-router-dom";
import QuestionItem from "./QuestionItem";

function QuestionView({ questions, studentList,handlebackClick }) {
  // const location = useLocation();
  // const questions = location.state?.questions;

  if (!questions) return <p>No question data received.</p>;
  const resId = questions[0]?.resource?.id;
  console.log(studentList);
  const handleBack = ()=>{
    handlebackClick(false)
  }
  return (
    <div className="sq-container">
      <div className="question-list-container">
        <div className="questionHeader">
          <div className="back-btn" onClick={handleBack}>back</div>
          <div className="question-detals-text">Question Details</div>
        </div>
        
        <div className="questions-list">
          {questions?.map((question, index) => (
          // <div key={question.id}>
          //     <p><strong>ID:</strong> {question.id}</p>
          // <p><strong>Text:</strong> {question.text}</p>
          // <p><strong>Level:</strong> {question.level}</p>
          // <p><strong>Mark:</strong> {question.mark}</p>
          // <p><strong>Topic:</strong> {question.topic}</p>
          // <p><strong>Quiz:</strong> {question.quiz.name}</p>
          // </div>
          <QuestionItem
            key={question.id}
            question={question}
            index={index + 1}
          />
        ))}
        </div>
      </div>
      <div className="student-list-container">
        <h3 className="text-center">Attended Student List</h3>
        <div>
          {studentList && studentList.length > 0 ? (
            <ul>
              {studentList.map((student, index) => (
                <a
                  key={index}
                  className="student-item"
                  href={`studentWorkBenchView/?id=${student.id}&resId=${resId}`}
                >
                  <i className="fa fa-user" aria-hidden="true"></i>
                  &nbsp;
                  {student.username}-{student.email}
                </a>
              ))}
            </ul>
          ) : (
            <p>No students available.</p>
          )}
        </div>
      </div>
    </div>
  );
}
export default QuestionView;
