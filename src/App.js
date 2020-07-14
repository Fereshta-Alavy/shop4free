import React, { useState } from "react";
import axios from "axios";
import "./App.css";
import { storage } from "./firebase";

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imgUrl, setImgUrl] = useState(null);
  const [images, setImages] = useState({});

  function fileSelecterHandler(event) {
    setSelectedFile(event.target.files[0]);
  }

  function fileUploadHandler() {
    // setImgUrl(URL.createObjectURL(selectedFile));
    const fd = new FormData();
    fd.append("image", selectedFile, selectedFile.name);
    axios
      .post(
        "https://us-central1-donate4free.cloudfunctions.net/uploadFiles",
        fd
      )
      .then(res => {
        storage.listAll().then(res => {
          console.log(typeof res);
          res.items.forEach(item =>
            storage
              .child(item.location.path)
              .getDownloadURL()
              .then(url => {
                const oldImages = images;
                oldImages[url] = null;
                setImages({ ...oldImages });
              })
          );
        });
      });
  }

  console.log(images);

  return (
    <div className="App">
      <input
        className="choose-file"
        type="file"
        onChange={fileSelecterHandler}
      />
      <button className="upload" onClick={fileUploadHandler}>
        Upload
      </button>
      <br />
      {Object.keys(images).map(url => {
        return <img src={url} height="300" width="300" />;
      })}
    </div>
  );
}

export default App;
