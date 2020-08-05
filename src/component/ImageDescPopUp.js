import React, { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

function ImageDescPopUp({ image, description, setImageFlag }) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setImageFlag(false);
  };
  return (
    <div className="item">
      <Dialog open={handleClickOpen} onClose={handleClose}>
        <DialogTitle id="form-dialog-title">
          description Of The Item
        </DialogTitle>
        {/* <DialogContent dividers>
    <DialogContentText>
      upload an Image an choose the nearby place
    </DialogContentText>
  </DialogContent> */}
        <DialogActions>
          <img src={image} height="400" width="400"></img>
          <div className="item-preview">
            <label>{description}</label>
            <button onClick={handleClose} color="primary">
              Cancel
            </button>
            <button>select</button>
          </div>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ImageDescPopUp;
