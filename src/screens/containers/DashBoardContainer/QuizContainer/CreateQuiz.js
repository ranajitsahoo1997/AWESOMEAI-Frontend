import React, { useState } from "react";
import { Client } from "../../../../Client/GraphQLClient";
import { useNavigate } from "react-router-dom";
// import { Client } from "../../../../graphqlClient";
function CreateQuiz() {
  const [title, SetTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [file, setFile] = useState(null);
  const navigate = useNavigate()
  const handleFileUpload = (file) => {
    console.log("Received in parent:", file);
    setUploadedFile(file);
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
                                $id: ID!
                            ) {
                                createQuiz(
                                name: $title
                                description: $desc
                                sourceFile: $file
                                id: $id
                                ) {
                                success
                                errors
                                quiz {
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
        id,
      });

      console.log(response);
      if(response.data.createQuiz.quiz.sourceFile!==null){
        console.log("entered",response.data.createQuiz.quiz)
        navigate("/mentor-dashboard")
      }else{
        console.log("entered",response.data.createQuiz.quiz.sourceFile)
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
      <div className="container ">
        <h4>Create Quiz</h4>
        {error && <p>Error: {error}</p>}
        <div>
          <form onSubmit={handleCreateQuiz}>
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
            <input type="file" onChange={handleFileChange} readOnly />
            <button type="submit" className="btn btn-info text-center">
              Create
            </button>
            {/* <button type="reset" className="btn btn-info text-center">Reset</button> */}
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateQuiz;
