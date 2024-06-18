import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

console.log('env value is here ', process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID)

const firebaseConfig = {
  // apiKey: "AIzaSyBDV8LPPMghOUdLqYUWdHQR7DrFPANUnb4",
  // authDomain: "learning-firebase-3004.firebaseapp.com",
  // projectId: "learning-firebase-3004",
  // storageBucket: "learning-firebase-3004.appspot.com",
  // messagingSenderId: "701830552098",
  // appId: "1:701830552098:web:13975373ed304d0b65087b",
  // databaseURL: "https://learning-firebase-3004-default-rtdb.firebaseio.com",
  // measurementId: "G-ZHG8BRPFC1",

  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };