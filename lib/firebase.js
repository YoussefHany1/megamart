import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAWoGkRQ350qwhdI-i-VHe6z-d2O8bPchk",
  authDomain: "megamart0.firebaseapp.com",
  projectId: "megamart0",
  storageBucket: "megamart0.firebasestorage.app",
  messagingSenderId: "1039516479160",
  appId: "1:1039516479160:web:dbb27c894f9421fb05ce4d",
  measurementId: "G-DH4G5GGJ2G",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
