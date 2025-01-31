// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAAfN76frRVEemx48jKO_jWO2BNapiclUQ",
  authDomain: "movie-club-36a7a.firebaseapp.com",
  projectId: "movie-club-36a7a",
  storageBucket: "movie-club-36a7a.firebasestorage.app",
  messagingSenderId: "435921590917",
  appId: "1:435921590917:web:e27c795ffdd5cbc06d67ec",
  measurementId: "G-V0Y1QV5P39",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app); //  Ensure this is correctly exported
