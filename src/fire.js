// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import * as firebase from "firebase/app";

// Add the Firebase services that you want to use
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDUU56JDD0MTVHnXgFbbqhkpuvpYz-rZeM",
    authDomain: "roommate-finder-a6dc3.firebaseapp.com",
    databaseURL: "https://roommate-finder-a6dc3.firebaseio.com",
    projectId: "roommate-finder-a6dc3",
    storageBucket: "roommate-finder-a6dc3.appspot.com",
    messagingSenderId: "469846752920",
    appId: "1:469846752920:web:abc5f988e485fda929daed"
  };
  
// Initialize Firebase
const fire = firebase.initializeApp(firebaseConfig);

export default fire;