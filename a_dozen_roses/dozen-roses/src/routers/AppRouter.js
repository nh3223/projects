import React, { useContext, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { firebase } from '../firebase/firebase';
import { login, logout } from '../actions/user';
import Welcome from '../components/Welcome';
import PlayRound from '../components/PlayRound';
import NotFound from '../components/NotFound';
import GlobalContext from '../context/GlobalContext';

const onAuthStateChange = (userDispatch) => {
  firebase.auth().onAuthStateChanged((user) => {
    (user) ? userDispatch(login(user.uid)) : userDispatch(logout());
  });
};

const AppRouter = () => {

  const { userDispatch } = useContext(GlobalContext);

  useEffect(() => {
    const unsubscribe = onAuthStateChange(userDispatch);
    return () => {
      unsubscribe();
    }
  }, []);

  return (
    <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ Welcome } />
          <Route exact path="/play" component={ PlayRound } />
          <Route component={ NotFound } />
        </Switch>
    </BrowserRouter>
  );
};

export default AppRouter;