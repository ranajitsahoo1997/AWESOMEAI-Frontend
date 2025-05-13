import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import { useSearchParams } from 'react-router-dom';

function DeleteQuizModal() {
    const [search] = useSearchParams()
    const id = search.get("quizId")
    const [show,setShow] = useState(true)
    const handleClose = ()=>{
        setShow(false)
    }
    
  return (
    <Modal show={show} onHide={handleClose} >
    <Modal.Header style={{color: "red"}}  closeButton>
      <Modal.Title>Error!!</Modal.Title>
    </Modal.Header>
    <Modal.Body style={{color: "red"}}>something</Modal.Body>
    <Modal.Footer>
      <button  onClick={handleClose}>
        Close
      </button>
      
    </Modal.Footer>
  </Modal>
  )
}

export default DeleteQuizModal