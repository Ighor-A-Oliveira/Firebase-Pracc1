import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyAHUHJnhXLGfDGhufBECPcvlhhBzy13z-M",
  authDomain: "fir-couse-1f238.firebaseapp.com",
  projectId: "fir-couse-1f238",
  storageBucket: "fir-couse-1f238.firebasestorage.app",
  messagingSenderId: "100397024652",
  appId: "1:100397024652:web:0be635ecc5b56d480d42a9",
  measurementId: "G-FYDD9DMCKD"
};

// Initialize Firebase
    //connects my project to the firebase service
const app = initializeApp(firebaseConfig);
// eslint-disable-next-line no-unused-vars
const analytics = getAnalytics(app);

//this var will handle authentication, we already defined the login methods on the firebase console
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);