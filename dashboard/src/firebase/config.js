import * as firebase from 'firebase';
import 'firebase/auth';
import 'firebase/firestore';

var firebaseConfig = {
  apiKey: 'AIzaSyBzA_Oml-QmobK1Idnj-AqzlZnBgKNc1Sw',
  authDomain: 'webtech-a600b.firebaseapp.com',
  databaseURL: 'https://webtech-a600b.firebaseio.com',
  projectId: 'webtech-a600b',
  storageBucket: 'webtech-a600b.appspot.com',
  messagingSenderId: '48977654182',
  appId: '1:48977654182:web:6d9744c8392d121b2a5f67'
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const database = firebase.firestore();
const projectStorage = firebase.storage();
const timestamp = firebase.firestore.FieldValue.serverTimestamp;
const Auth = firebase.auth();

export { database, Auth, projectStorage, timestamp };
