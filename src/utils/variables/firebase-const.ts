/* eslint-disable import/no-duplicates */
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

firebase.initializeApp({
  apiKey: 'AIzaSyCjSThKQ4QgNeaiBwaeGvoV0RmFaB0kgsg',
  authDomain: 'sisk-book-tool.firebaseapp.com',
  projectId: 'sisk-book-tool',
  storageBucket: 'sisk-book-tool.appspot.com',
  messagingSenderId: '1070184996817',
  appId: '1:1070184996817:web:71ac2cb95a4c5210e90af0'
});

export const auth = firebase.auth();
export const db = firebase.firestore();

export default firebase;
