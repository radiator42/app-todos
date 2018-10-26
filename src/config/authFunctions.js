import { auth } from './firebase';

export const doCreateUserWithEmailAndPassword = (email, password) => {
  auth.createUserWithEmailAndPassword(email, password);
};

export const doSignInWithEmailAndPassword = (email, password) => {
  auth.signInWithEmailAndPassword(email, password);
};

export const logOut = (history) => {
  auth.signOut();
  history.push('/');
};
