// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAxhkO_PsrZMMgmnAAgIZ9mVM1D8tuN9V4",
  authDomain: "fresh-market-project-2f2a5.firebaseapp.com",
  projectId: "fresh-market-project-2f2a5",
  storageBucket: "fresh-market-project-2f2a5.firebasestorage.app",
  messagingSenderId: "712527966443",
  appId: "1:712527966443:web:9f093c234667fce41d0eae"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);