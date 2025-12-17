// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA6NRcBAb15vzPqULk8DpXCDJITvMNE6WQ",
  authDomain: "tbc-firebaseapp.firebaseapp.com",
  projectId: "tbc-firebaseapp",
  storageBucket: "tbc-firebaseapp.firebasestorage.app",
  messagingSenderId: "234175523328",
  appId: "1:234175523328:web:084281c5233e77246806e5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
