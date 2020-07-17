import React, { useState } from "react";
import { red } from "color-name";
import { storage } from "../firebase";

function ImgUpload() {
  const [img, setSelectedFile] = useState(null);
  // const [url, setUrl] = useState("");
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState("");
  const [images, setImages] = useState({});

  const fileSelecterHandler = event => {
    setSelectedFile(event.target.files[0]);
  };

  const fileUploadHandler = () => {
    if (img) {
      const uploadTask = storage.ref(`images/${img.name}`).put(img);
      uploadTask.on(
        "state_changed",
        snapshot => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(progress);
        },
        error => {
          // error function ....
          console.log(error);
          setError(error);
        },
        () => {
          storage
            .ref("images")
            .listAll()
            .then(res => {
              res.items.forEach(item =>
                storage
                  .ref()
                  .child(item.location.path)
                  .getDownloadURL()
                  .then(url => {
                    const oldImages = images;
                    oldImages[url] = null;
                    setImages({ ...oldImages });
                  })
              );
            });
        }
      );
    } else {
      setError("Please choose an image to upload");
    }
  };

  return (
    <div>
      <div>
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

      <div>
        <p style={{ color: "red" }}>{error}</p>
        {progress > 0 ? <progress value={progress} max="100" /> : ""}
      </div>
    </div>
  );
}

export default ImgUpload;
