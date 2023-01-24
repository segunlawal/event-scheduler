import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: "habitter-v1.firebaseapp.com",
  projectId: "habitter-v1",
  storageBucket: "habitter-v1.appspot.com",
  messagingSenderId: "895810504957",
  appId: "1:895810504957:web:28c8fd14350c15bc87d694",
  measurementId: "G-QN7J960TH4",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
