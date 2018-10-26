import firebase from 'firebase';

const DB_CONFIG = {
  apiKey: 'AIzaSyCv3MFCPeGsZV83iXnwJlAPuDVArS8TsJ8',
  authDomain: 'todolist-9dc95.firebaseapp.com',
  databaseURL: 'https://todolist-9dc95.firebaseio.com',
  projectId: 'todolist-9dc95',
  storageBucket: 'todolist-9dc95.appspot.com',
  messagingSenderId: '602075448654',
};

if (!firebase.apps.length) {
  firebase.initializeApp(DB_CONFIG);
}

const database = firebase.database().ref();
const dataStorage = firebase.storage().ref();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export {
  database,
  dataStorage,
  auth,
  provider,
};
