import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";



const firebaseConfig = {
    apiKey: "AIzaSyDHfx5XFa1jOdoy6nzKodu8aTkEniW5_D8",
    authDomain: "todo-test-b4383.firebaseapp.com",
    projectId: "todo-test-b4383",
    storageBucket: "todo-test-b4383.firebasestorage.app",
    messagingSenderId: "789747928355",
    appId: "1:789747928355:web:071d544e34ee3ec3b19096",
    measurementId: "G-MJ105RF8F9"
  };


console.log(process.env)

// Initialize Firebase
const app = initializeApp(firebaseConfig);





export const db = getFirestore(app);