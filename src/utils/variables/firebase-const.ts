/* eslint-disable import/no-duplicates */
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

// Personal config
const devSKD = {
  apiKey: 'AIzaSyCjSThKQ4QgNeaiBwaeGvoV0RmFaB0kgsg',
  authDomain: 'sisk-book-tool.firebaseapp.com',
  projectId: 'sisk-book-tool',
  storageBucket: 'sisk-book-tool.appspot.com',
  messagingSenderId: '1070184996817',
  appId: '1:1070184996817:web:71ac2cb95a4c5210e90af0'
};

// SISK config
const prodSKD = {
  apiKey: 'AIzaSyBkpuumjGC7moYF4Nn9EFAf87WcbnHvWMQ',
  authDomain: 'sisk-booking-app.firebaseapp.com',
  projectId: 'sisk-booking-app',
  storageBucket: 'sisk-booking-app.appspot.com',
  messagingSenderId: '81448700590',
  appId: '1:81448700590:web:55f96a17b053cf64997b3f'
};

firebase.initializeApp(prodSKD);

export const auth = firebase.auth();
export const db = firebase.firestore();

export default firebase;
