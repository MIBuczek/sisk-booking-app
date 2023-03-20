/* eslint-disable import/no-duplicates */
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

/* Personal config */
let SKD = {
   apiKey: 'AIzaSyCjSThKQ4QgNeaiBwaeGvoV0RmFaB0kgsg',
   authDomain: 'sisk-book-tool.firebaseapp.com',
   projectId: 'sisk-book-tool',
   storageBucket: 'sisk-book-tool.appspot.com',
   messagingSenderId: '1070184996817',
   appId: '1:1070184996817:web:71ac2cb95a4c5210e90af0'
};

/* SISK config */
if (process.env.NODE_ENV === 'production') {
   SKD = {
      apiKey: 'AIzaSyBkpuumjGC7moYF4Nn9EFAf87WcbnHvWMQ',
      authDomain: 'sisk-booking-app.firebaseapp.com',
      projectId: 'sisk-booking-app',
      storageBucket: 'sisk-booking-app.appspot.com',
      messagingSenderId: '81448700590',
      appId: '1:81448700590:web:55f96a17b053cf64997b3f'
   };
}

const firebaseApp = firebase.initializeApp(SKD);

const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

export { auth, db };
