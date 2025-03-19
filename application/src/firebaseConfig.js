import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAmWJxTEapRlPGMT7RenD7xTEhy5lztv5M",
    authDomain: "scrum-poker-97f56.firebaseapp.com",
    projectId: "scrum-poker-97f56",
    storageBucket: "scrum-poker-97f56.firebasestorage.app",
    messagingSenderId: "415221865360",
    appId: "1:415221865360:web:edbb5c1fc2095699b77115"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
