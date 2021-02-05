import firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyALTVqPCo2EfB7233MJq3a98lyFHxp4EJM",
  authDomain: "clone-bbfe1.firebaseapp.com",
  databaseURL: "https://clone-bbfe1.firebaseio.com",
  projectId: "clone-bbfe1",
  storageBucket: "clone-bbfe1.appspot.com",
  messagingSenderId: "484767378819",
  appId: "1:484767378819:web:5a444bc84efdcda3dd9ab6",
  measurementId: "G-XWRF6NSM3M"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };