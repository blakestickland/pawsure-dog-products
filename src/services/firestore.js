// Import the function you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA_bqbDQhB0ceZROkSX76of-5HQxqOiTyI",
  authDomain: "pawsure-firestore.firebaseapp.com",
  projectId: "pawsure-firestore",
  storageBucket: "pawsure-firestore.appspot.com",
  messagingSenderId: "67440175363",
  appId: "1:67440175363:web:a2114a2ba90cc99ee86136"
};

firebase.initializeApp(firebaseConfig);

// Initialize Firestore
const firestore = firebase.firestore();
export default firestore;
