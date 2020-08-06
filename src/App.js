import React, { useState, useEffect, useContext } from "react";
import "./App.css";
import ImgUpload from "./component/ImgUpload";
import ImageDescPopUp from "./component/ImageDescPopUp";
import { Router } from "@reach/router";
import SignIn from "./component/SignIn";
import SignUp from "./component/SignUp";
import { Switch, Route, Link } from "react-router-dom";

import PasswordReset from "./component/PasswordReset";

import UserProvider from "./providers/UserProvider";
import { auth, signInWithGoogle } from "./firebase";
import { GOOGLE_API_KEY } from "./config";
import { firestore } from "./firebase";
import { UserContext } from "./providers/UserProvider";
import Application from "./component/Application";

import HomePage from "./HomePage";

function App() {
  const user = useContext(UserContext);
  return (
    <div>
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route exact path="/upload">
          {user ? <ImgUpload /> : <SignIn />}
        </Route>
        <Route exact path="/singIn">
          <SignIn />
        </Route>
        <Route exact path="/signUp">
          <SignUp />
        </Route>
        <Route exact path="/passwordReset">
          <PasswordReset />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
