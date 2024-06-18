// // Import the specific Firebase services you need
// import { initializeApp } from 'firebase/app';
// import { getFirestore } from 'firebase/firestore';

// const firebaseConfig = {
  // apiKey: "AIzaSyBDV8LPPMghOUdLqYUWdHQR7DrFPANUnb4",
  // authDomain: "learning-firebase-3004.firebaseapp.com",
  // databaseURL: "https://learning-firebase-3004-default-rtdb.firebaseio.com",
  // projectId: "learning-firebase-3004",
  // storageBucket: "learning-firebase-3004.appspot.com",
  // messagingSenderId: "701830552098",
  // appId: "1:701830552098:web:13975373ed304d0b65087b",
  // measurementId: "G-ZHG8BRPFC1"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);

// // Initialize Firestore
// const db = getFirestore(app);

// export { db };

// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBDV8LPPMghOUdLqYUWdHQR7DrFPANUnb4",
  authDomain: "learning-firebase-3004.firebaseapp.com",
  databaseURL: "https://learning-firebase-3004-default-rtdb.firebaseio.com",
  projectId: "learning-firebase-3004",
  storageBucket: "learning-firebase-3004.appspot.com",
  messagingSenderId: "701830552098",
  appId: "1:701830552098:web:13975373ed304d0b65087b",
  measurementId: "G-ZHG8BRPFC1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };

// // 1. Create a document
// const addNote = async (noteData) => {
  // try {
  //   const docRef = await addDoc(collection(db, 'notes'), noteData);
  //   console.log('Document written with ID: ', docRef.id);
  //   return docRef.id;
  // } catch (error) {
  //   console.error('Error adding document: ', error);
  // }
// };

// // 2. Read documents
// const getNotes = async () => {
  // try {
  //   const querySnapshot = await getDocs(collection(db, 'notes'));
  //   const notes = querySnapshot.docs.map((doc) => ({
  //     id: doc.id,
  //     ...doc.data()
  //   }));
  //   return notes;
  // } catch (error) {
  //   console.error('Error getting documents: ', error);
  // }
// };

// // 3. Update a document
// const updateNote = async (noteId, newData) => {
  // try {
  //   const docRef = await updateDoc(doc(db, 'notes', noteId), newData);
  //   console.log('Document updated with ID: ', docRef.id);
  // } catch (error) {
  //   console.error('Error updating document: ', error);
  // }
// };

// // 4. Delete a document
// const deleteNote = async (noteId) => {
//   try {
//     await deleteDoc(doc(db, 'notes', noteId));
//     console.log('Document successfully deleted!');
//   } catch (error) {
//     console.error('Error deleting document: ', error);
//   }
// };
