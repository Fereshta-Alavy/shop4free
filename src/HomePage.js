import React, { useState, useEffect, useContext } from "react";
import "./App.css";
import ImgUpload from "./component/ImgUpload";
import ImageDescPopUp from "./component/ImageDescPopUp";
import { useHistory } from "react-router-dom";
import { Router } from "@reach/router";
import SignIn from "./component/SignIn";
import SignUp from "./component/SignUp";

import PasswordReset from "./component/PasswordReset";

import UserProvider from "./providers/UserProvider";
import { auth } from "./firebase";
import { GOOGLE_API_KEY } from "./config";
import { firestore } from "./firebase";

import Application from "./component/Application";

function HomePage() {
  const [images, setImages] = useState([]);
  const [flag, setFlag] = useState(false);
  const [imageFlag, setImageFlag] = useState(false);
  const [signUpFlag, setSignUpFlag] = useState(false);
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const history = useHistory();

  useEffect(() => {
    firestore
      .collection("ImageInfo")
      .orderBy("date", "desc")
      .get()
      .then(res => {
        res.forEach(doc => {
          const docId = doc.id;
          console.log(docId);
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
    history.push("/upload");
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

      {signUpFlag ? <Application setSignUpFlag={setSignUpFlag} /> : null}

      <button
        className="w-full py-3 bg-red-600 mt-4 text-white"
        onClick={() => {
          auth.signOut();
        }}
      >
        Sign out
      </button>
    </div>
  );
}

export default HomePage;
