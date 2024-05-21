import { initializeApp, getApps } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAiTnucAI84GEaN7XORASxRXS-7bfJ23ac",
    authDomain: "eduquiz-5a8fa.firebaseapp.com",
    databaseURL: "https://eduquiz-5a8fa-default-rtdb.firebaseio.com",
    projectId: "eduquiz-5a8fa",
    storageBucket: "eduquiz-5a8fa.appspot.com",
    messagingSenderId: "225978677736",
    appId: "1:225978677736:web:3bea55bf9ecbffbc440c5d"
};

// Verifique se o Firebase já foi inicializado
let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

const database = getDatabase(app);
const db = getFirestore(app);

export { app, database, db };