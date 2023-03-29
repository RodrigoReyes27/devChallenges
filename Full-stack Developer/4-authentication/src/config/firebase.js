import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyCiG5AND9qZfBH1ogB4yvHPtPol-CNm2J4",
  authDomain: "auth-app-35aa9.firebaseapp.com",
  projectId: "auth-app-35aa9",
  storageBucket: "auth-app-35aa9.appspot.com",
  messagingSenderId: "749270747938",
  appId: "1:749270747938:web:37c068975288e36452737b",
  measurementId: "G-6145C15GMR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);