// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCEIwsQlOzzhacZv9J3XoPn84qT18nU-74",
  authDomain: "password-generator-aa3de.firebaseapp.com",
  projectId: "password-generator-aa3de",
  storageBucket: "password-generator-aa3de.appspot.com",
  messagingSenderId: "357623218229",
  appId: "1:357623218229:web:50aea621a7acea44b3b17c",
  measurementId: "G-5HXKXF2V0N"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();



// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyCEIwsQlOzzhacZv9J3XoPn84qT18nU-74",
//   authDomain: "password-generator-aa3de.firebaseapp.com",
//   projectId: "password-generator-aa3de",
//   storageBucket: "password-generator-aa3de.firebasestorage.app",
//   messagingSenderId: "357623218229",
//   appId: "1:357623218229:web:50aea621a7acea44b3b17c",
//   measurementId: "G-5HXKXF2V0N"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);