import React, { useState } from "react";
import axios from "axios";
import "./App.css";
import { db, storage } from "./firebase";
import ImgUpload from "./component/ImgUpload";

function App() {
  // const [selectedFile, setSelectedFile] = useState(null);
  // const [imgUrl, setImgUrl] = useState(null);
  // const [images, setImages] = useState({});

  // function fileSelecterHandler(event) {
  //   setSelectedFile(event.target.files[0]);
  // }

  // function fileUploadHandler() {
  //   // setImgUrl(URL.createObjectURL(selectedFile));
  //   const fd = new FormData();
  //   fd.append("image", selectedFile, selectedFile.name);
  //   axios
  //     .post(
  //       "https://us-central1-donate4free.cloudfunctions.net/uploadFiles",
  //       fd
  //     )
  //     .then(res => {
  //       console.log(res);
  //       storage.listAll().then(res => {
  //         res.items.forEach(item =>
  //           storage
  //             .child(item.location.path)
  //             .getDownloadURL()
  //             .then(url => {
  //               const oldImages = images;
  //               oldImages[url] = null;
  //               setImages({ ...oldImages });
  //             })
  //         );
  //       });
  //     });
  // }

  // console.log(images);

  return (
    <div className="App">
      <ImgUpload />
    </div>
  );
}

export default App;
