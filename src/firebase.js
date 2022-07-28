import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDejBQtd6NQMC6UfiBvp06A9ha-4SSILnU",
    authDomain: "contacts-3e20b.firebaseapp.com",
    projectId: "contacts-3e20b",
    storageBucket: "contacts-3e20b.appspot.com",
    messagingSenderId: "826602701961",
    appId: "1:826602701961:web:94cf2cc3f1e219c64ff258"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();

const auth = firebase.auth();

const provider = new firebase.auth.GoogleAuthProvider();

export default db;
export { auth, provider }