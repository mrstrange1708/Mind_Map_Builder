import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCNCe_95PPqjJorJsGmZ0WctcKr0HTo1DY",
  authDomain: "mind-map-c76f4.firebaseapp.com",
  projectId: "mind-map-c76f4",
  storageBucket: "mind-map-c76f4.firebasestorage.app",
  messagingSenderId: "193883068085",
  appId: "1:193883068085:web:1b7fcad358058f8db210fc",
  measurementId: "G-Z2JH81WPKD"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);