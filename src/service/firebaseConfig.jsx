// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_GOOGLE_FIREBASE_API_KEY,
  authDomain: "trip-planner-cafb8.firebaseapp.com",
  projectId: "trip-planner-cafb8",
  storageBucket: "trip-planner-cafb8.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_GOOGLE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_GOOGLE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_GOOGLE_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
const analytics = getAnalytics(app);
