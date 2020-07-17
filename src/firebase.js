import * as firebase from "firebase";
import "firebase/storage";

var firebaseConfig = {
  apiKey: "AIzaSyAiE3VmRK--LfGxtNz8u8PuMFMD6tBH8sw",
  authDomain: "donate4free.firebaseapp.com",
  databaseURL: "https://donate4free.firebaseio.com",
  projectId: "donate4free",
  storageBucket: "donate4free.appspot.com",
  messagingSenderId: "36445766881",
  appId: "1:36445766881:web:62675b5509cdbcc48763a0",
  measurementId: "G-XVTJYNC4V1"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();
// const db = firebase.firestore();

export { storage, firebase as default };
