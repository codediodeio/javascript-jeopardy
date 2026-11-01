import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/performance";
import "firebase/analytics";

// Note: Firebase web config values identify the project; they are not secrets.
// Access is controlled by Firestore security rules and API key restrictions in
// the Google Cloud console, not by hiding these values.
export const firebaseConfig = {
  apiKey: "AIzaSyC5SMvTLdHpK8aT6mzZ-axC2qlv7yBGaEs",
  authDomain: "javascript-jeopardy-a8220.firebaseapp.com",
  databaseURL: "https://javascript-jeopardy-a8220.firebaseio.com",
  projectId: "javascript-jeopardy-a8220",
  storageBucket: "javascript-jeopardy-a8220.appspot.com",
  messagingSenderId: "946146998781",
  appId: "1:946146998781:web:5cc6d2fd3d42fac10b4194",
  measurementId: "G-7JEP9HMV9R"
};

// Guard against double initialisation (e.g. during hot reload).
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
