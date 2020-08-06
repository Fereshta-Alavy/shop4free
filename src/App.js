import React, { useContext } from "react";
import "./App.css";
import ImgUpload from "./component/ImgUpload";

import SignIn from "./component/SignIn";
import SignUp from "./component/SignUp";
import { Switch, Route, Link } from "react-router-dom";

import PasswordReset from "./component/PasswordReset";

import { UserContext } from "./providers/UserProvider";

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
