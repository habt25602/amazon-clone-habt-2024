import firebase from "firebase/compat/app";
import { getAuth } from "firebase/auth";
import "firebase/compat/firestore";
import "firebase/compat/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCIGjrt8j7-TeS8PEi8qYI5Y6JedhyLUBk",
  authDomain: "clone-d2915.firebaseapp.com",
  projectId: "clone-d2915",
  storageBucket: "clone-d2915.firebasestorage.app",
  messagingSenderId: "891944040708",
  appId: "1:891944040708:web:add2a07907d3d6a1ba3851",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = app.firestore();
