import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyB10l8Mzf7Eoz5B2TkPfZdSQIxl2j664fw",
  authDomain: "anime-wallpaper-48a9c.firebaseapp.com",
  projectId: "anime-wallpaper-48a9c",
  storageBucket: "anime-wallpaper-48a9c.firebasestorage.app",
  messagingSenderId: "913267203048",
  appId: "1:913267203048:web:4b6a15d54234b7e355225d"
};


const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
