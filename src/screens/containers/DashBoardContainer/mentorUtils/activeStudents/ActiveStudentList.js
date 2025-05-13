import React from 'react'
import "./activeStudentLists.css"

function ActiveStudentList() {

  const studentList = [
    "Aarav Mehta",
    "Anaya Sharma",
    "Rohan Patel",
    "Ishita Singh",
    "Vedant Reddy",
    "Sanya Kapoor",
    "Aryan Gupta",
    "Diya Verma",
    "Kunal Joshi",
    "Meera Iyer",
    "Nikhil Desai",
    "Tanya Rao",
    "Yash Malhotra",
    "Priya Nair",
    "Kabir Jain",
    "Simran Kaur",
    "Aditya Chauhan",
    "Sneha Agarwal",
    "Rahul Bansal",
    "Neha Dubey"
  ];
  

  return (
    <div className='students-container'>
      <ul>
        {
          studentList.map((element, index) => (
            <div key={index}>
              <p>{element} </p>
              <hr />
            </div>
          ))
        }
      </ul>
    </div>
  )
}

export default ActiveStudentList