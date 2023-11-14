import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD6m4dPe0dVfgKOTa3GFgs42sUS0OAW3jQ",
  authDomain: "react-netflix-clone-3f925.firebaseapp.com",
  projectId: "react-netflix-clone-3f925",
  storageBucket: "react-netflix-clone-3f925.appspot.com",
  messagingSenderId: "599845801753",
  appId: "1:599845801753:web:574b58063bd344838fbf88",
  measurementId: "G-19VEWNGEK6"
};


const app = initializeApp(firebaseConfig);
export const firebaseAuth=getAuth(app); 