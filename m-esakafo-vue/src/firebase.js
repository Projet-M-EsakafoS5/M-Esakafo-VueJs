import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyApxACHC_7yMd7QfVbmTUUDzmsSCrHdxXI",
  authDomain: "m-esakafo.firebaseapp.com",
  projectId: "m-esakafo",
  storageBucket: "m-esakafo.appspot.com",
  messagingSenderId: "18425166496",
  appId: "1:18425166496:web:YOUR_WEB_APP_ID"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db, signInWithEmailAndPassword, onAuthStateChanged };
