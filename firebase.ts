// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCIyTdysOBFwl8qSfKevQTUxvYemzKYwUw",
  authDomain: "everywheresync.firebaseapp.com",
  projectId: "everywheresync",
  storageBucket: "everywheresync.appspot.com",
  messagingSenderId: "521451528793",
  appId: "1:521451528793:web:467b44ed722318c6f94748",
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };
