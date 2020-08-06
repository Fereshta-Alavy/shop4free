import React, { useState, useContext } from "react";
import PickUpPlace from "./PickUpPlace";
import firebase, {
  firestore,
  storage,
  generateUserDocument
} from "../firebase";

import { useHistory } from "react-router-dom";
import { GOOGLE_API_KEY } from "../config";
import { UserContext } from "../providers/UserProvider";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

function ImgUpload() {
  const user = useContext(UserContext);
  console.log(user);
  const history = useHistory();

  const [img, setSelectedFile] = useState(null);
  const [desc, setSelectedDesc] = useState("");

  const [progress, setProgress] = useState(0);
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);
  const [coordinates, setCoordinates] = useState({
    lat: null,
    lng: null
  });
  const [address, setAddress] = useState("");

  const handleClose = () => {
    history.push("/");
  };

  const fileSelecterHandler = event => {
    setSelectedFile(event.target.files[0]);
  };

  const handleDescription = event => {
    setSelectedDesc(event.target.value);
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
            firestore
              .collection("ImageInfo")

              .add({
                ImageUrl: downloadURL,
                date: new Date(),
                coord: coordinates,
                address: address,
                description: desc
              })
              .then(function(docRef) {
                const imageDocId = docRef.id;
                firestore
                  .collection("users")
                  .doc(user.uid)
                  .update({
                    imageDoc: firebase.firestore.FieldValue.arrayUnion(
                      imageDocId
                    )
                  });
              })
              .catch(function(error) {
                console.error("Error adding document: ", error);
              });

            history.push("/");
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
        <PickUpPlace
          setCoordinates={setCoordinates}
          setAddress={setAddress}
          address={address}
        />
      </div>
      <TextField
        id="standard-secondary"
        label="description"
        color="secondary"
        onChange={handleDescription}
      />
      <Button onClick={fileUploadHandler} color="primary">
        Upload
      </Button>

      <Button onClick={handleClose} color="primary">
        Cancel
      </Button>

      <p style={{ color: "red" }}>{error}</p>

      {progress > 0 ? <progress value={progress} max="100" /> : ""}
    </div>
  );
}

export default ImgUpload;
