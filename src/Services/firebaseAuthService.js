import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyCVGVVdBJOVx_FAVGhPYfuM-NoOcdurDdg",
  authDomain: "moviehub-7b919.firebaseapp.com",
  projectId: "moviehub-7b919",
  storageBucket: "moviehub-7b919.firebasestorage.app",
  messagingSenderId: "194562864228",
  appId: "1:194562864228:web:ba497fad4b4aed5fb69b71"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();