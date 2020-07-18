import React, { useState, useEffect } from "react";
import { red } from "color-name";
import { db, storage } from "../firebase";

function ImgUpload() {
  const [img, setSelectedFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState("");
  const [images, setImages] = useState([]);

  useEffect(() => {
    db.collection("ImageInfo")
      .orderBy("date", "desc")
      .get()
      .then(res => {
        res.forEach(doc => {
          console.log(doc.data());
          const oldImg = images;
          oldImg.push(doc.data().ImageUrl);
          setImages([...oldImg]);
        });
      });
  }, []);
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
          setError(error);
        },
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
            db.collection("ImageInfo").add({
              ImageUrl: downloadURL,
              date: new Date()
            });
            const oldImages = images;
            oldImages.unshift(downloadURL);
            setImages([...oldImages]);
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
        {images.map(url => {
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
