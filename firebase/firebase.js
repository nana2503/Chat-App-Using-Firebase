import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { getStorage } from 'firebase/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyCpPIvf87y-FFt5MC378Z6hAPCoIk3iV6U",
  authDomain: "demoreactnative-d4fce.firebaseapp.com",
  databaseURL: "https://demoreactnative-d4fce-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "demoreactnative-d4fce",
  storageBucket: "demoreactnative-d4fce.appspot.com",
  //storageBucket: "gs://demoreactnative-d4fce.appspot.com",
  messagingSenderId: "129717270296",
  appId: "1:129717270296:web:e583ecc6207c3401c0906d",
  measurementId: "G-E85PVVY2PW"
};
// const firebaseConfig = {
//   apiKey: "AIzaSyAWex8235_t5F4f9c1-PVRO2_KpFdU-SCk",
//   authDomain: "giftapp-5931b.firebaseapp.com",
//   databaseURL: "https://giftapp-5931b-default-rtdb.asia-southeast1.firebasedatabase.app",
//   projectId: "giftapp-5931b",
//   storageBucket: "giftapp-5931b.appspot.com",
//   messagingSenderId: "781571938196",
//   appId: "1:781571938196:web:5f9209e8da63a1e2892181",
//   measurementId: "G-YGZ6SMYKKX"
// };
// Initialize Firebase
//firebase.initializeApp(firebaseConfig);
const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});
const db = getDatabase(app);
const storages = getStorage(app);
//const storageRef = firebase.storage().ref();
export { db, auth, storages };