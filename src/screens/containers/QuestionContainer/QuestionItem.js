import React from 'react'

function QuestionItem({question,index}) {
    console.log(question);
    
  return (
    <div className='container'>
        <div className='question-container'>
            <div className='row'>
                <div className='col-md-1'>
                    <p><b>Q{index}.</b></p>
                </div>
                <div className='col-md-11'>
                    <p><b><i>{question.question}</i></b></p>
                </div>
                <div className='col-md-12'>
                    <div className='question-weight'>
                        <div><p><b>Mark:</b> <i>{question.mark}</i></p></div>
                        <div><p><b>Difficulty:</b> <i>{question.level}</i></p></div>
                        <div><p><b>topic:</b> <i>{question.topic}</i></p></div>
                    </div>
                </div>
            </div>
        </div>
        <hr/>
    </div>
  )
}

export default QuestionItem;