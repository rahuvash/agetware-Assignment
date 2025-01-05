import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';


    const firebaseConfig = {
        apiKey: "AIzaSyDTG7p5AUinj-iegHCCH6bnAkz2XG6ymSU",
        authDomain: "aegis-2f717.firebaseapp.com",
        projectId: "aegis-2f717",
        storageBucket: "aegis-2f717.firebasestorage.app",
        messagingSenderId: "874577907967",
        appId: "1:874577907967:web:d719a1f99d0cd58e90bcca",
        measurementId: "G-BF5SCNKYWT"
      };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
