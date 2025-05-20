import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Client } from "../../../../Client/GraphQLClient";

function UpdateResource() {
  const { id } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [title, SetTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const QUIZ_VIEW_QUERY = `
    query ResourceView($id: ID!)
    {
      getResourceById(id: $id){
        id
        name
        description
        sourceFile
        sourceFileUrl
        createdAt
  
      }
    }    
  `;
  const handleUpateResource = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(false);

    const UPDATE_QUIZ_MUTATION = `
        mutation UpdateResource($title: String!,$desc: String!,$file: Upload!,$id: ID!) 
        {
            updateResource(name: $title,description: $desc,sourceFile: $file,id: $id) 
            {
                success
                errors
            }
        }
  `;
    try {
      console.log("user-->", file);
      setLoading(true);
      const response = await Client(UPDATE_QUIZ_MUTATION, {
        title,
        desc,
        file,
        id,
      });

      console.log(response);
      if (response.data.updateResource.success) {
        navigate("/mentor-dashboard")
      }
     
    } catch (error) {
      setError("Resource updation Failed!! try again");
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchQuiz = async (id) => {
      setError("");

      try {
        setLoading(true);
        const { data } = await Client(QUIZ_VIEW_QUERY, { id });
        console.log(data);
        setError("")
        setQuiz(data.getResourceById);
        SetTitle(quiz.name);
        setDesc(quiz.description);
        setFile(quiz.sourceFile);
      } catch (error) {
        setLoading(false);
        setError("Error in fetching Reesource");
      } finally {
        setLoading(false);
      }
    };
    fetchQuiz(id);
  }, quiz);
  return (
    <div className="quiz-container">
      <div className="container ">
        <h4>Update Resource</h4>
        {error && <p>Error: {error}</p>}
        <div>
          <form onSubmit={handleUpateResource}>
            <div className="row">
              <label>Title</label>

              <input
                type="text"
                className="input-box"
                placeholder="Enter Title"
                onChange={(e) => SetTitle(e.target.value)}
                value={title}
                required
              />
            </div>
            <div className="row">
              <label>Description</label>

              <textarea
                type="text"
                className="input-box"
                rows={3}
                placeholder="Enter description"
                onChange={(e) => setDesc(e.target.value)}
                value={desc}
                required
              />
            </div>
            {/* <DragAndDrop onFileUpload={handleFileUpload} /> */}
            <input
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
              readOnly
            />
            {file && <p>New file selected: {file.name}</p>}
            <button type="submit" className="btn btn-info text-center">
              Update
            </button>
            {/* <button type="reset" className="btn btn-info text-center">Reset</button> */}
          </form>
        </div>
      </div>
    </div>
  );
}

export default UpdateResource;
