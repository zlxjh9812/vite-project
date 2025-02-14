// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC0FW5Moob_ZRY2eRtyiQDKFNjrFNVbiO4",
  authDomain: "clonetwitter-25794.firebaseapp.com",
  projectId: "clonetwitter-25794",
  storageBucket: "clonetwitter-25794.firebasestorage.app",
  messagingSenderId: "519070461771",
  appId: "1:519070461771:web:90e533da0c91deeb39c2ce"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);