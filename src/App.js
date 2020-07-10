import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [selectedFile, setSelectedFile] = useState(null);

  function fileSelecterHandler(event) {
    setSelectedFile(event.target.files[0]);
  }

  function fileUploadHandler() {
    const fd = new FormData();
    fd.append("image", selectedFile, selectedFile.name);
    axios
      .post(
        "https://us-central1-donate4free.cloudfunctions.net/uploadFiles",
        fd
      )
      .then(res => {
        console.log(res);
      });
  }

  return (
    <div className="App">
      <input type="file" onChange={fileSelecterHandler} />

      <button onClick={fileUploadHandler}>Upload</button>
    </div>
  );
}

export default App;
