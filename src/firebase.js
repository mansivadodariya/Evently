// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAOrddUEchPbFEdIF4_12tEB5wV1lzQGH8",
  authDomain: "evently-10bb4.firebaseapp.com",
  projectId: "evently-10bb4",
  storageBucket: "evently-10bb4.appspot.com",
  messagingSenderId: "739370418805",
  appId: "1:739370418805:web:e1132b263a56a9c823ae3c",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
