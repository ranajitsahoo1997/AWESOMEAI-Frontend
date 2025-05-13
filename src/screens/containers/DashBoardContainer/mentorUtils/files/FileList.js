import React from 'react'
import "./files.css";

const fileList = [
  "Report_Q1.pdf",
  "Meeting_Notes.txt",
  "Project_Proposal.pdf",
  "Budget_2025.txt",
  "Resume_JohnDoe.pdf",
  "Ideas_Brainstorm.txt",
  "Invoice_001.pdf",
  "Log_2025-05-01.txt",
  "Schedule_May.pdf",
  "Summary_Chapter1.txt",
  "UserGuide.pdf",
  "Instructions.txt",
  "Presentation_Intro.pdf",
  "Notes_Session1.txt",
  "Checklist_Launch.pdf",
  "TaskList.txt",
  "Agenda_Meeting.pdf",
  "Daily_Notes.txt",
  "Feedback_Form.pdf",
  "Todo_Weekend.txt"
];

function FileList() {
  return (
    <div className='list-conatiner'>
        
        {
          fileList.map((element, index) => (
            <div key={index}>
              <p>{element}</p>
              <hr />
            </div>
          ))
        }
    </div>
  )
}

export default FileList