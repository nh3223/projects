import { firebase, googleAuthProvider } from '../firebase/firebase';

export const login = (uid) => ({
  type: 'LOGIN',
  uid
});

export const firebaseLogin = () => {
  return () => {
    return firebase.auth().signInWithPopup(googleAuthProvider);
  }
}

export const logout = () => ({ type: 'LOGOUT' });

export const firebaseLogout = () => {
  return () => {
    return firebase.auth().signOut();
  }
}