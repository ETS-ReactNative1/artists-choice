import firebase from "firebase";

// Initialize Firebase
var config = {
  apiKey: process.env.REACT_APP_ARTISTS_CHOICE_FIREBASE_APIKEY,
  authDomain: process.env.REACT_APP_ARTISTS_CHOICE_FIREBASE_AUTHDOMAIN,
  databaseURL: process.env.REACT_APP_ARTISTS_CHOICE_FIREBASE_DATABASEURL,
  projectId: process.env.REACT_APP_ARTISTS_CHOICE_FIREBASE_PROJECTID,
  storageBucket: process.env.REACT_APP_ARTISTS_CHOICE_FIREBASE_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_ARTISTS_CHOICE_CLIENTID
};

const fire = firebase.initializeApp(config);

export default fire;
