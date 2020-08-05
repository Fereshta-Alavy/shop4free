import React, { useState, useEffect } from "react";
import "./App.css";
import ImgUpload from "./component/ImgUpload";
import ImageDescPopUp from "./component/ImageDescPopUp";
import { GOOGLE_API_KEY } from "./config";
import { db } from "./firebase";

function App() {
  const [images, setImages] = useState([]);
  const [flag, setFlag] = useState(false);
  const [imageFlag, setImageFlag] = useState(false);
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    db.collection("ImageInfo")
      .get()
      .then(res => {
        res.forEach(doc => {
          const oldImg = images;
          const imgObj = {};
          imgObj.url = doc.data().ImageUrl;
          imgObj.address = doc.data().address;
          imgObj.description = doc.data().description;
          oldImg.push(imgObj);
          setImages([...oldImg]);
        });
      });
  }, []);

  function showPopUpHandler() {
    setFlag(true);
  }
  function handleImageClick(image, desc) {
    setImageFlag(true);
    setImage(image);

    setDescription(desc);
    console.log(desc);
  }

  return (
    <div className="App">
      <div>
        <button onClick={showPopUpHandler}>Upload Image</button>
      </div>

      {flag ? (
        <ImgUpload images={images} setImages={setImages} setFlag={setFlag} />
      ) : null}

      {images.map(obj => {
        return (
          <div className="individual-image">
            <img
              src={obj.url}
              height="300"
              width="300"
              onClick={() => handleImageClick(obj.url, obj.description)}
            />
            <i className="material-icons">location_on</i>
            <label className="label">{obj.address}</label>
            {/* <button onClick={setImage(obj.url)}>select</button> */}
          </div>
        );
      })}
      {imageFlag ? (
        <ImageDescPopUp
          image={image}
          description={description}
          setImageFlag={setImageFlag}
        />
      ) : null}
    </div>
  );
}

export default App;
