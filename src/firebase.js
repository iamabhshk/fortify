import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseApp = {
  apiKey: "AIzaSyDpclUaFVgM_yLPv0_crCspkTiQLiTKsGI",
  authDomain: "chat-fortify.firebaseapp.com",
  projectId: "chat-fortify",
  storageBucket: "chat-fortify.appspot.com",
  messagingSenderId: "891146286142",
  appId: "1:891146286142:web:135d04fa9581ec155c4d6f",
  measurementId: "G-FW8EWJ5997",
};

const app = initializeApp(firebaseApp);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
