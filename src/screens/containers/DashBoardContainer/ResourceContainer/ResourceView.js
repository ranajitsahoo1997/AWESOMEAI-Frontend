import React, { useEffect, useState } from "react";
import moment from "moment";
import { SlOptionsVertical } from "react-icons/sl";
import TextViewer from "./TextViewer";
import PdfViewer from "./PdfViewer";

import Modal from "react-bootstrap/Modal";

import Button from "react-bootstrap/Button";
import { Client } from "../../../../Client/GraphQLClient";
import { useLocation, useNavigate } from "react-router-dom";
import { IoSearch } from "react-icons/io5";

function highlightText(text, highlight) {
  if (!highlight) return text;

  const regex = new RegExp(`(${highlight})`, "gi");
  const parts = text.split(regex);

  return parts.map((part, i) =>
    regex.test(part) ? (
      <mark key={i} style={{ backgroundColor: "yellow" }}>
        {part}
      </mark>
    ) : (
      part
    )
  );
}

function QuizView({ quiz, refetchQuizzes, top, searchText }) {
  const [show, setShow] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
 
  const navigate = useNavigate();

  console.log(quiz);
  console.log(top, "--->");

  const handleIconClick = () => {
    setShow(!show);
  };

  const handleClose = () => {
    console.log("close");

    setShowModal(false);
  };

  const timeago = moment(quiz?.createdAt).fromNow();
  const id = quiz?.id;
  const handleDelete = async () => {
    setError("");
    setLoading(true);
    const DELETE_MUTATION = `
        mutation DeleteResource($id: ID!)
        {
          deleteResource(id: $id){
            success
            errors

          }
        }
    `;
    try {
      const { data } = await Client(DELETE_MUTATION, { id });
      console.log(id);
      if (data?.deleteResource?.success) {
        console.log("deleted");
        await refetchQuizzes();
        handleClose();
        setShow(false);
        
        navigate("/mentor-dashboard");
      }
    } catch (error) {
      setLoading(false);
      setError("Error in deleting");
    }
  };
 

  

  return (
    <>
      {quiz ? (
        <div className="quiz-view-container">
          
          <div className="row ">
            <div className="col-md-7 ">
              <div className="quiz_name">
                {highlightText(quiz?.name, searchText)}
              </div>
            </div>

            <div className="col-md-5 quiz-t-container">
              <div className="row">
                {timeago !== "Invalid date" ? (
                  <div className="quiz-time col-md-11">
                    Time: <p className="actual-time">{timeago}</p>
                  </div>
                ) : null}
              </div>
              <div className="action-container col-md-1">
                {timeago !== "Invalid date" ? (
                  <SlOptionsVertical onClick={handleIconClick} />
                ) : null}
                {show ? (
                  <div className="action">
                    <div>
                      <a href={`update-resource/${quiz?.id}`}>update</a>
                    </div>

                    <div>
                      <a
                        href="#"
                        onClick={() => {
                          setShowModal(true);
                        }}
                      >
                        delete
                      </a>
                      <Modal show={showModal} onHide={handleClose} centered>
                        <Modal.Header style={{ color: "red" }} closeButton>
                          <Modal.Title>Resource Delete!!</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          Are you sure you want to delete this resource{" "}
                          <b>
                            <i>{quiz?.name}</i>
                          </b>{" "}
                          ?
                        </Modal.Body>
                        <Modal.Footer>
                          <Button variant="secondary" onClick={handleClose}>
                            No
                          </Button>
                          <Button variant="primary" onClick={handleDelete}>
                            Yes
                          </Button>
                        </Modal.Footer>
                      </Modal>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
          <div style={{ marginLeft: "10px" }}>
            <b>
              <i>Description:</i>
            </b>
          </div>

          <div className="quiz-desc">
            <div>{highlightText(quiz?.description, searchText)}</div>
          </div>

          <div className="quiz-content">
            {quiz?.sourceFileUrl?.endsWith(".txt") ? (
              <TextViewer url={quiz?.ecryptedSrcFileUrl} />
            ) : null}
            {quiz?.sourceFileUrl?.endsWith(".pdf") ? (
              <PdfViewer fileUrl={quiz?.ecryptedSrcFileUrl} />
            ) : null}
          </div>
        </div>
      ) : (
        <div className="text-center w-80">
          <p>Please add some Resources</p>
        </div>
      )}
    </>
  );
}

export default QuizView;
