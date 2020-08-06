import React, { useContext, useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import { Router } from "@reach/router";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import ProfilePage from "./ProfilePage";
import PasswordReset from "./PasswordReset";

import UserProvider from "../providers/UserProvider";
import { UserContext } from "../providers/UserProvider";

function Application({ setSignUpFlag }) {
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setSignUpFlag(false);
  };

  return (
    <Dialog open={handleClickOpen} onClose={handleClose}>
      <Router>
        <SignUp path="signUp" />
        <SignIn path="/" />
        <PasswordReset path="passwordReset" />
      </Router>
    </Dialog>
  );
}
export default Application;
