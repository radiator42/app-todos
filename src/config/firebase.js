import firebase from 'firebase';

const DB_CONFIG = {
  apiKey: 'AIzaSyCv3MFCPeGsZV83iXnwJlAPuDVArS8TsJ8',
  authDomain: 'todolist-9dc95.firebaseapp.com',
  databaseURL: 'https://todolist-9dc95.firebaseio.com',
  projectId: 'todolist-9dc95',
  storageBucket: 'todolist-9dc95.appspot.com',
  messagingSenderId: '602075448654',
};

firebase.initializeApp(DB_CONFIG);
const database = firebase.database().ref();

export default database;
