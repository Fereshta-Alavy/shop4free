import React, { useState, useEffect, useContext } from "react";
import "./App.css";
import ImgUpload from "./component/ImgUpload";
import Button from "@material-ui/core/Button";
import ImageDescPopUp from "./component/ImageDescPopUp";
import { useHistory } from "react-router-dom";
import { auth } from "./firebase";
import { firestore } from "./firebase";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    "& > *": {
      margin: theme.spacing(1)
    }
  }
}));

function HomePage() {
  const classes = useStyles();
  const [images, setImages] = useState([]);
  const [imageFlag, setImageFlag] = useState(false);
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
    <div className="App" className={classes.root}>
      <Button variant="contained" color="primary" onClick={showPopUpHandler}>
        Upload Image
      </Button>

      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          auth.signOut();
        }}
      >
        Sign out
      </Button>

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

export default HomePage;
