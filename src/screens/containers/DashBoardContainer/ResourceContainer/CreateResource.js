import React, { useState } from "react";
import { Client } from "../../../../Client/GraphQLClient";
import { useNavigate } from "react-router-dom";
import Navbar from "../../userContainerUtils/Navbar/navbar";
import DragAndDrop from "../mentorUtils/dropbox/Dropbox";
// import { Client } from "../../../../graphqlClient";
function CreateResource() {
  const [title, SetTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [level, setLevel] = useState("");
  const [marks, setMark] = useState(0);
  const [topic, setTopic] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [file, setFile] = useState(null);
  const navigate = useNavigate();
  const handleFileUpload = (file) => {
    console.log("Received in parent:", file);
    // setUploadedFile(file);
    setFile(file);
  };
  const handleFileChange = (e) => {
    const files = e.target.files[0]; // Get the first selected file
    setFile(files); // Update state with the selected file
  };
  const id = JSON.parse(localStorage.getItem("currentUser")).id;
  const handleCreateQuiz = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(false);

    // const formData = new FormData();
    // const id = JSON.parse(localStorage.getItem("currentUser")).id;
    // const operations = JSON.stringify({
    //   query: `
    //   mutation CreateQuiz(
    //     $title: String!
    //     $desc: String!
    //     $file: Upload!
    //     $id: ID!
    //   ) {
    //     createQuiz(
    //       name: $title
    //       description: $desc
    //       sourceFile: $file
    //       id: $id
    //     ) {
    //       success
    //       errors
    //       quiz {
    //         name
    //         sourceFile
    //       }
    //     }
    //   }
    // `,
    //   variables: {
    //     title: title,
    //     desc: desc,
    //     file: null, // placeholder for file
    //     id: id,
    //   },
    // });
    // const map = JSON.stringify({
    //   0: ["variables.file"],
    // });

    // formData.append("operations", operations);
    // formData.append("map", map);
    // formData.append("0", file);

    const CREATE_QUIZ_MUTATION = `
                            mutation CreateQuiz(
                                $title: String!
                                $desc: String!
                                $file: Upload!
                                $level: String!
                                $marks: Int!
                                $topic: String!
                                $id: ID!
                            ) {
                                createResource(
                                name: $title
                                description: $desc
                                sourceFile: $file
                                level: $level
                                marks: $marks
                                topic: $topic
                                id: $id
                                ) {
                                success
                                errors
                                resource {
                                    name
                                    sourceFile
                                    ecryptedSrcFile
                                }
                                }
                            }
`;
    try {
      console.log("user-->", file);
      setLoading(true);
      //   const response = await fetch("http://localhost:8000/graphql/", {
      //     method: "POST",
      //     body: formData,
      //   });
      const response = await Client(CREATE_QUIZ_MUTATION, {
        title,
        desc,
        file,
        level,
        marks,
        topic,
        id,
      });

      console.log(response);
      if (response.data.createResource.resource.sourceFile !== null) {
        console.log("entered", response.data.createResource.resource);
        navigate("/mentor-dashboard");
      } else {
        console.log(
          "entered",
          response.data.createResource.resource.sourceFile
        );
      }
    } catch (error) {
      setError("Quiz creation Failed!! try again");
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="quiz-container">
      <Navbar />
      <div className="login-container1 ">
        {error && <p>Error: {error}</p>}
        <div className="resource-form">
          <h1 className="resource-text">Create Resource</h1>
          <form className="" onSubmit={handleCreateQuiz}>
            <div className="">
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
              <div className="col-md-6">
                <label>Difficulty Level</label>

                <div className="row ">
                  <div className="col-md-3 radio-input">
                    <input
                      type="radio"
                      className=" "
                      name="level"
                      placeholder="Enter Level (e.g Easy|Medium|Hard)"
                      onChange={(e) => setLevel(e.target.value)}
                      value={"Easy"}
                      required
                    />
                    <label className="ml-3">Easy</label>
                  </div>
                  <div className="col-md-3 radio-input">
                    <input
                      type="radio"
                      className=""
                      name="level"
                      placeholder="Enter Level (e.g Easy|Medium|Hard)"
                      onChange={(e) => setLevel(e.target.value)}
                      value={"Medium"}
                      required
                    />
                    <label className="ml-3">Medium</label>
                  </div>
                  <div className="col-md-3 radio-input">
                    <input
                      type="radio"
                      className=" "
                      name="level"
                      placeholder="Enter Level (e.g Easy|Medium|Hard)"
                      onChange={(e) => setLevel(e.target.value)}
                      value={"Hard"}
                      required
                    />
                    <label className="ml-3">Hard</label>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <label>Marks</label>

                <input
                  type="number"
                  className="input-box"
                  placeholder="Enter Marks 5|10|12"
                  onChange={(e) => setMark(e.target.value)}
                  value={marks}
                  required
                />
              </div>
            </div>
            <div className="">
              <label>Topic</label>

              <input
                type="text"
                className="input-box"
                placeholder="Enter Topic Name"
                onChange={(e) => setTopic(e.target.value)}
                value={topic}
                required
              />
            </div>

            <div className="row">
              <label>Description</label>

              <textarea
                type="text"
                className="input-box"
                style={{ width: "98%", marginLeft: "10px", height: "150px" }}
                rows={3}
                placeholder="Enter description"
                onChange={(e) => setDesc(e.target.value)}
                value={desc}
                required
              />
            </div>
            <DragAndDrop onFileUpload={handleFileUpload} required />
            {/* <input type="file" onChange={handleFileChange} readOnly /> */}
            <div className="btn-container">
              <button type="submit" className="resource-btn text-center">
                Create
              </button>
            </div>

            {/* <button type="reset" className="btn btn-info text-center">Reset</button> */}
          </form>
        </div>
        <div className="box-div1"></div>
        <div className="box-div2"></div>
        <div className="box-div3"></div>
        <div className="triangle"></div>
        <div className="box-div5"></div>
      </div>
    </div>
  );
}

export default CreateResource;
