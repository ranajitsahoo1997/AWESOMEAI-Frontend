import React, { useState, useRef } from "react";
import "./dropbox.css";
import { AiFillDropboxSquare } from "react-icons/ai";

const DragAndDrop = ({ onFileUpload }) => {
  const [file, setFile] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef(null); // reference to input

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      setFile(droppedFile);
    }
  };

  const handleClick = () => {
    fileInputRef.current.click(); // programmatically click the hidden input
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    console.log(selectedFile);
    if (selectedFile) {
      setFile(selectedFile);
    }
    onFileUpload(selectedFile);
  };

  return (
    <div>
      
        <div
          className="drop-box-container mx-auto"
          onClick={handleClick}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          style={{
            backgroundColor: dragOver ? "#eee" : "#fff",
          }}
        >
          <div className="drop-icon">
            <AiFillDropboxSquare />
          </div>
          <div>
            <input
              type="file"
              accept=".pdf,.txt"
              ref={fileInputRef}
              onChange={handleFileChange}
              style={{ display: "none" }} // hidden input
            />
            {file ? (
              <p>File selected: {file.name}</p>
            ) : (
              <p>Click or drag & drop a file here</p>
            )}
          </div>
        </div>

        
      
    </div>
  );
};

export default DragAndDrop;
