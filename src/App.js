import React, { useState, useEffect } from "react";
import "./App.css";
import ImgUpload from "./component/ImgUpload";
import { GOOGLE_API_KEY } from "./config";
import { db } from "./firebase";
// import Geocode from "react-geocode";
// Geocode.setApiKey(GOOGLE_API_KEY);

function App() {
  const [images, setImages] = useState([]);
  const [flag, setFlag] = useState(false);

  useEffect(() => {
    db.collection("ImageInfo")
      .orderBy("date", "desc")
      .get()
      .then(res => {
        res.forEach(doc => {
          const oldImg = images;
          const address = doc.data().address;
          const imgObj = {};
          imgObj.url = doc.data().ImageUrl;
          imgObj.address = address;
          oldImg.push(imgObj);
          setImages([...oldImg]);
        });
      });
  }, []);

  function showPopUpHandler() {
    setFlag(true);
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
            <img src={obj.url} height="300" width="300" />
            <i className="material-icons">location_on</i>
            <label className="label">{obj.address}</label>
          </div>
        );
      })}
    </div>
  );
}

export default App;
