import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";



const firebaseConfig = {
    apiKey: "AIzaSyD17ZTCztFv3rVdGglfxwoX0MlKGAHMlCE",
    authDomain: "list-service-be73a.firebaseapp.com",
    projectId: "list-service-be73a",
    storageBucket: "list-service-be73a.firebasestorage.app",
    messagingSenderId: "1069175626464",
    appId: "1:1069175626464:web:976dfe9d494d27a16c0e85"
  };


console.log(process.env)

// Initialize Firebase
const app = initializeApp(firebaseConfig);





export const db = getFirestore(app);