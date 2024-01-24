import firebase from 'firebase/compat/app';

const firebaseConfig = {
    apiKey: "AIzaSyBLTIObAewsODe38Ojb-RwhY05XW3VyK1Y",
    authDomain: "workit-2a960.firebaseapp.com",
    projectId: "workit-2a960",
    storageBucket: "workit-2a960.appspot.com",
    messagingSenderId: "739378291395",
    appId: "1:739378291395:web:e8a87cef5fab22a469f876",
    measurementId: "G-C1S468C7XG"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

export default firebaseApp;
