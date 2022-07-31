import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDr7gSfy5mcvs3eSUluMrWt7u5YnNmztxQ",
  authDomain: "twitter-clone-e2920.firebaseapp.com",
  projectId: "twitter-clone-e2920",
  storageBucket: "twitter-clone-e2920.appspot.com",
  messagingSenderId: "736440001454",
  appId: "1:736440001454:web:16a50313f65f23178d1e3f",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
