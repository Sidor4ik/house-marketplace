import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBm8a66dtwSOfzTCXDYDQR2xc9wj8bpohs",
  authDomain: "house-marketplace-ad07c.firebaseapp.com",
  projectId: "house-marketplace-ad07c",
  storageBucket: "house-marketplace-ad07c.appspot.com",
  messagingSenderId: "78051140535",
  appId: "1:78051140535:web:00fa2f04ba95547da2be32"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore();