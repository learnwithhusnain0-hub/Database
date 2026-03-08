// Firebase Configuration - APNI VALUES DALO
const firebaseConfig = {
    apiKey: "AIzaSyCF9siuMZAZSBlTszrh_yUAn74Zf5eomlA",
    authDomain: "database-a1900.firebaseapp.com",
    projectId: "database-a1900",
    storageBucket: "database-a1900.firebasestorage.app",
    messagingSenderId: "995556005813",
    appId: "1:995556005813:web:43a9772e779e497439ebfc",
    measurementId: "G-91RE00BK3Y"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize services
const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();
