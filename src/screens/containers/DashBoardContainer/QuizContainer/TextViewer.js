import { useEffect, useState } from "react";

const TextViewer = ({url}) => {
  const [fileContent, setFileContent] = useState("");

  useEffect(() => {
    fetch(url)
      .then((res) => res.text())
      .then((data) => setFileContent(data))
      .catch((err) => console.error("Failed to load file:", err));
  }, []);

  return (
    <div className="file-container">
      <pre>{fileContent}</pre>
    </div>
  );
};

export default TextViewer;
