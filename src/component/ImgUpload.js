import React, { useState, useEffect, Fragment } from "react";
import { red } from "color-name";
import PickUpPlace from "./PickUpPlace";
import { db, storage } from "../firebase";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DropDownMenu from "material-ui/DropDownMenu";
import MenuItem from "@material-ui/core/MenuItem";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

function ImgUpload({ images, setImages, setFlag }) {
  const [img, setSelectedFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setFlag(false);
  };

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
      setFlag(false);
    } else {
      setError("Please choose an image to upload");
    }
  };

  return (
    <div>
      <Dialog open={handleClickOpen} onClose={handleClose}>
        <DialogTitle id="form-dialog-title">Upload An Item</DialogTitle>
        <DialogContent dividers>
          <DialogContentText>
            upload an Image an choose the nearby place
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <div>
            <input
              className="choose-file"
              type="file"
              onChange={fileSelecterHandler}
            />
            <PickUpPlace />
          </div>

          <Button onClick={fileUploadHandler} color="primary">
            Upload
          </Button>

          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>

          {/* <MuiThemeProvider>
            <DropDownMenu onChange={handlePlaceChange}>
              {publicPlaces.map((place, index) => (
                <MenuItem primaryText={place} />
              ))}
            </DropDownMenu>
          </MuiThemeProvider> */}
        </DialogActions>
        <p style={{ color: "red" }}>{error}</p>
      </Dialog>

      {progress > 0 ? <progress value={progress} max="100" /> : ""}
    </div>
  );
}

export default ImgUpload;
