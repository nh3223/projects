import React, { useState, useEffect } from 'react';
import { ThemeProvider } from 'styled-components';

import { firebase } from '../firebase/firebase';
import { firebaseLogin, firebaseLogout } from '../firebase/user';

import GlobalStyle from '../styles/GlobalStyle';
import theme from '../styles/theme';

import Home from './Home';

const App = () => {

  const [ user, setUser ] = useState({ uid: null, isAuthenticated: false });

  const login = async () => await firebaseLogin();

  const logout = async () => await firebaseLogout();

  useEffect(() => {
    firebase.auth().onAuthStateChanged((firebaseUser) => {
      (firebaseUser)
      ? setUser({ uid: (firebaseUser.uid), isAuthenticated: true })
      : setUser({ uid: null, isAuthenticated: false });
    });
  }, []);

  return (
    <ThemeProvider theme={ theme } >
      <GlobalStyle />
      <Home user={ user } login={ login } logout={ logout }/>
    </ThemeProvider>
  );   

};

export default App;
