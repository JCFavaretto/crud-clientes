// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDvYD8Va1Spc3EcPCA_L0wPdcg-M5bPgpU",
  authDomain: "clientes-mama.firebaseapp.com",
  projectId: "clientes-mama",
  storageBucket: "clientes-mama.firebasestorage.app",
  messagingSenderId: "165684884951",
  appId: "1:165684884951:web:bf0e9dec46ee8134ebc792",
  measurementId: "G-WG0HYM3QD7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
