import { firebase, googleAuthProvider } from './firebase';

export const firebaseLogin = async () => await firebase.auth().signInWithPopup(googleAuthProvider).user;

export const firebaseLogout = () => firebase.auth().signOut();