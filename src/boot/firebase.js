import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { 
  getDatabase, 
  ref, 
  get, 
  set,
  update,
  remove,
  onValue, 
  onChildAdded, 
  onChildChanged, 
  onChildRemoved 
} from 'firebase/database';

const firebaseConfig = {
  apiKey: process.env.FIREBASE_APIKEY,
  authDomain: process.env.FIREBASE_AUTHDOMAIN,
  databaseURL: process.env.FIREBASE_DATABASEURL,
  projectId: process.env.FIREBASE_PROJECTID,
  storageBucket: process.env.FIREBASE_STORAGEBUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGINGSENDERID,
  appId: process.env.FIREBASE_APPID,
  measurementId: process.env.FIREBASE_MEASUREMENTID,
};

// let firebaseApp = firebase.initializeApp(firebaseConfig);
// firebase.analytics();

const firebaseApp = initializeApp(firebaseConfig);

const firebaseAuth = getAuth(firebaseApp);
const firebaseDb = getDatabase(firebaseApp);

export { 
  firebaseAuth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  firebaseDb, 
  ref, 
  get, 
  set,
  update,
  remove, 
  onValue, 
  onChildAdded, 
  onChildChanged, 
  onChildRemoved 
}