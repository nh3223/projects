import { firebase, googleAuthProvider } from '../firebase/firebase';

export const login = (uid) => ({
  type: 'LOGIN',
  uid
});

export const firebaseLogin = async () => {
  console.log('actions - firebaselogin')
  const user = await firebase.auth().signInWithPopup(googleAuthProvider).user;
  console.log('actions - login - user', user);
  return user;
};

export const logout = () => ({ type: 'LOGOUT' });

export const firebaseLogout = () => firebase.auth().signOut();