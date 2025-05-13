import React from 'react'
import Modal from 'react-bootstrap/Modal';
function SucessModal(show,handleClose,message) {
  return (
    <Modal show={show} onHide={handleClose} >
    <Modal.Header style={{color: "green", fontWeight:"bold"}}  closeButton>
      <Modal.Title>Suceess!!</Modal.Title>
    </Modal.Header>
    <Modal.Body style={{color: "green"}}>{message}</Modal.Body>
    {/* <Modal.Footer>
      <button  onClick={handleClose}>
        Close
      </button>
      
    </Modal.Footer> */}
  </Modal>
  )
}

export default SucessModal