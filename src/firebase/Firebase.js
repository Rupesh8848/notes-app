// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAIA8Q68ZgNIZrvX66ssdUzxDdFWF88roo",
  authDomain: "notes-app-2e3fd.firebaseapp.com",
  projectId: "notes-app-2e3fd",
  storageBucket: "notes-app-2e3fd.appspot.com",
  messagingSenderId: "965915396687",
  appId: "1:965915396687:web:edbf359bf30b4396b1b83a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore()

