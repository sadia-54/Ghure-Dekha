// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyB2YP8uRfupb3Oc19fnwV8DzhYx43GGF4M",

    authDomain: "ai-tripper-3243a.firebaseapp.com",
  
    projectId: "ai-tripper-3243a",
  
    storageBucket: "ai-tripper-3243a.firebasestorage.app",
  
    messagingSenderId: "1059124109916",
  
    appId: "1:1059124109916:web:d5fd305a03a74b82b4bc99",
  
    measurementId: "G-T14C7XNTF6"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);