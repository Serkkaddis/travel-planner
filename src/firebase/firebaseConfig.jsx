// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "travel-planner-4e495.firebaseapp.com",
  projectId: "travel-planner-4e495",
  storageBucket: "travel-planner-4e495.firebasestorage.app",
  messagingSenderId: "305434055549",
  appId: "1:305434055549:web:e0e69df07da954d84f3214",
  measurementId: "G-8VXJYNXBC7"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };