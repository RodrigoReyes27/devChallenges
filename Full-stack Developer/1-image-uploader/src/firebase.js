// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDjD-8SKLMNy0XhT9ONQ8HgWW7IlclPKZM",
  authDomain: "image-uploader-29d5f.firebaseapp.com",
  projectId: "image-uploader-29d5f",
  storageBucket: "image-uploader-29d5f.appspot.com",
  messagingSenderId: "116611221595",
  appId: "1:116611221595:web:991ac36ab481f00db1977e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)