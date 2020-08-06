import * as firebase from "firebase";
import "firebase/storage";
import "firebase/auth";
import "firebase/firestore";

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

export const auth = firebase.auth();
export const firestore = firebase.firestore();
const storage = firebase.storage();
const provider = new firebase.auth.GoogleAuthProvider();

export const signInWithGoogle = () => {
  auth.signInWithPopup(provider);
};

export const generateUserDocument = async (user, additionalData) => {
  if (!user) return;

  const userRef = firestore.doc(`users/${user.uid}`);
  const snapshot = await userRef.get();

  if (!snapshot.exists) {
    const { email, displayName, photoURL } = user;
    try {
      await userRef.set({
        displayName,
        email,
        photoURL,

        ...additionalData
      });
    } catch (error) {
      console.error("Error creating user document", error);
    }
  }
  return getUserDocument(user.uid);
};

const getUserDocument = async uid => {
  if (!uid) return null;
  try {
    const userDocument = await firestore.doc(`users/${uid}`).get();

    return {
      uid,
      ...userDocument.data()
    };
  } catch (error) {
    console.error("Error fetching user", error);
  }
};

export { storage, firebase as default };
