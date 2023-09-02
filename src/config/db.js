import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import firebaseConfig from "@/config/firebase";

const app = initializeApp(firebaseConfig);

const db = getDatabase(app);

export {db}
