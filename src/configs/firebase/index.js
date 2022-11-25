import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCSefYpLTu4bjIOhoJLAL6XkMHJWpRN03w",
  authDomain: "react-firebase-crud-9cec7.firebaseapp.com",
  projectId: "react-firebase-crud-9cec7",
  storageBucket: "react-firebase-crud-9cec7.appspot.com",
  messagingSenderId: "90331921970",
  appId: "1:90331921970:web:09a1c78ad833e5d323062b",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth();
export const storage = getStorage(app);
