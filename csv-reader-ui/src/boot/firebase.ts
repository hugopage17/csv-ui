import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyAO_OUtYAU-B1gP6WGOerb5dnN3olYSMGo',
  authDomain: 'csv-reader-5e12e.firebaseapp.com',
  projectId: 'csv-reader-5e12e',
  storageBucket: 'csv-reader-5e12e.appspot.com',
  messagingSenderId: '428230994739',
  appId: '1:428230994739:web:4f23e7b4eeab95736aec46',
  measurementId: 'G-954KVVSXDQ'
};

const firebaseApp = initializeApp(firebaseConfig);
getAuth(firebaseApp);

export default firebaseApp;
