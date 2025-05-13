import { useLocation } from 'react-router-dom';
import QuestionItem from './QuestionItem';

function QuestionView() {
  const location = useLocation();
  const questions = location.state?.questions;

  if (!questions) return <p>No question data received.</p>;

  return (
    <div>
      <h2 className='text-center'>Question Details</h2>
      {
        questions.map((question,index)=>(
            // <div key={question.id}>
            //     <p><strong>ID:</strong> {question.id}</p>
            // <p><strong>Text:</strong> {question.text}</p>
            // <p><strong>Level:</strong> {question.level}</p>
            // <p><strong>Mark:</strong> {question.mark}</p>
            // <p><strong>Topic:</strong> {question.topic}</p>
            // <p><strong>Quiz:</strong> {question.quiz.name}</p>
            // </div>
            <QuestionItem key={question.id} question={question} index={index+1}/>
            
        ))
      }
     
    </div>
  );
}
export default QuestionView;