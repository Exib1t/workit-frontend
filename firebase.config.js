// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBLTIObAewsODe38Ojb-RwhY05XW3VyK1Y",
    authDomain: "workit-2a960.firebaseapp.com",
    projectId: "workit-2a960",
    storageBucket: "workit-2a960.appspot.com",
    messagingSenderId: "739378291395",
    appId: "1:739378291395:web:e8a87cef5fab22a469f876",
    measurementId: "G-C1S468C7XG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
