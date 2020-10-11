import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import firebase from 'firebase/app';

// var firebaseConfig = {
//   apiKey: 'AIzaSyAdDltso982aXGaKayEEsb8X8QrrCBPuYM',
//   authDomain: 'webtechonologyproject.firebaseapp.com',
//   databaseURL: 'https://webtechonologyproject.firebaseio.com',
//   projectId: 'webtechonologyproject',
//   storageBucket: 'webtechonologyproject.appspot.com',
//   messagingSenderId: '203786217273',
//   appId: '1:203786217273:web:4f8336e3c15a5efacbeae8'
// };
var firebaseConfig = {
  apiKey: 'AIzaSyCTbdwnd9yUHByA2JKyma36ZRLPk393JXk',
  authDomain: 'webtechnology-project.firebaseapp.com',
  databaseURL: 'https://webtechnology-project.firebaseio.com',
  projectId: 'webtechnology-project',
  storageBucket: 'webtechnology-project.appspot.com',
  messagingSenderId: '744967695135',
  appId: '1:744967695135:web:a2347c636a4aa367195e2a'
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
