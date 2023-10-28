import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCOzbTK_a1fRFoINEcJyZaitoNhF-yQzmU",
  authDomain: "mern-vs.firebaseapp.com",
  projectId: "mern-vs",
  storageBucket: "mern-vs.appspot.com",
  messagingSenderId: "246311578364",
  appId: "1:246311578364:web:5ac545ab46c49742790579",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export default app;
