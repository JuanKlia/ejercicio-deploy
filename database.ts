import * as admin from "firebase-admin";
import * as serviceAcount from "./firebase.json";

admin.initializeApp({
  credential: admin.credential.cert(serviceAcount as any),
  databaseURL: process.env.DATA_BASE_URL,
});

const firestore = admin.firestore();
const rtdb = admin.database();

export { rtdb, firestore };
