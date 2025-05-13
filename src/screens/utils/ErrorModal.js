import React from 'react'
import Modal from 'react-bootstrap/Modal';


function ErrorModal({show,handleClose,message}) {
  return (
    <Modal show={show} onHide={handleClose} >
    <Modal.Header style={{color: "red"}}  closeButton>
      <Modal.Title>Error!!</Modal.Title>
    </Modal.Header>
    <Modal.Body style={{color: "red"}}>{message}</Modal.Body>
    {/* <Modal.Footer>
      <button  onClick={handleClose}>
        Close
      </button>
      
    </Modal.Footer> */}
  </Modal>
  )
}

export default ErrorModal;