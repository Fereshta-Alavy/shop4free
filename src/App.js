import React from "react";
import "./App.css";
import ImgUpload from "./component/ImgUpload";
import GetLocation from "./component/GetLocation";

function App() {
  return (
    <div className="App">
      <ImgUpload />
      <GetLocation />
    </div>
  );
}

export default App;
