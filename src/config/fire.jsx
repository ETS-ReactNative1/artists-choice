import firebase from "firebase";

// Initialize Firebase
var config = {
  apiKey: "AIzaSyD7PL9JoSZT6e0cHHurZpM66jOtzVWlIvs",
  authDomain: "artists-choice.firebaseapp.com",
  databaseURL: "https://artists-choice.firebaseio.com",
  projectId: "artists-choice",
  storageBucket: "artists-choice.appspot.com",
  messagingSenderId: "1056341225820",
  appId: "1:1056341225820:web:3199e2da162f25cb6cd199"
};

const fire = firebase.initializeApp(config);

export default fire;
