// firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCFrjOkvLe2puocRTQJhKinCG64nXTxWR8",
  authDomain: "studysynergy-caae1.firebaseapp.com",
  databaseURL: "https://studysynergy-caae1-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "studysynergy-caae1",
  storageBucket: "studysynergy-caae1.appspot.com",
  messagingSenderId: "283483078580",
  appId: "1:283483078580:web:6267b3280057a866a73ce1",
  measurementId: "G-7YSJWSBMDE"
};

const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage, app };



