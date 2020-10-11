import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import firebase from 'firebase/app';

var firebaseConfig = {
  apiKey: 'AIzaSyAdDltso982aXGaKayEEsb8X8QrrCBPuYM',
  authDomain: 'webtechonologyproject.firebaseapp.com',
  databaseURL: 'https://webtechonologyproject.firebaseio.com',
  projectId: 'webtechonologyproject',
  storageBucket: 'webtechonologyproject.appspot.com',
  messagingSenderId: '203786217273',
  appId: '1:203786217273:web:4f8336e3c15a5efacbeae8'
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
