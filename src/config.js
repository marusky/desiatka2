import firebase from "firebase/app";
import "firebase/firestore";

firebase.initializeApp({
  apiKey: "AIzaSyAL_YFLJciBdp-3ilv8YnBK07zhD73IqdQ",
  authDomain: "desiatka-ecavza.firebaseapp.com",
  projectId: "desiatka-ecavza",
  storageBucket: "desiatka-ecavza.appspot.com",
  messagingSenderId: "459276092073",
  appId: "1:459276092073:web:77a7aee2f2c30c674adfb8",
});

export const firestore = firebase.firestore();
