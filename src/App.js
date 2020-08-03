import React, { useState, useEffect } from "react";
import "./App.css";
import ImgUpload from "./component/ImgUpload";

// import { getLocation, getNearbyPlaces } from "./component/GetLocation";
import { db } from "./firebase";

function App() {
  const [images, setImages] = useState([]);
  const [flag, setFlag] = useState(false);
  // const [publicPlaces, setPublicPlaces] = useState([]);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  useEffect(() => {
    db.collection("ImageInfo")
      .orderBy("date", "desc")
      .get()
      .then(res => {
        res.forEach(doc => {
          const oldImg = images;
          oldImg.push(doc.data().ImageUrl);
          setImages([...oldImg]);
        });
      });
  }, []);

  function showPopUpHandler() {
    setFlag(true);
  }

  // if (latitude) {
  //   getNearbyPlaces(latitude, longitude).then(places =>
  //     setPublicPlaces(places)
  //   );
  // }

  return (
    <div className="App">
      <div>
        <button onClick={showPopUpHandler}>Upload Image</button>
      </div>

      {flag ? (
        <ImgUpload
          images={images}
          setImages={setImages}
          setFlag={setFlag}
          // publicPlaces={publicPlaces}
        />
      ) : null}

      {images.map(url => {
        return <img src={url} height="300" width="300" />;
      })}
    </div>
  );
}

export default App;
