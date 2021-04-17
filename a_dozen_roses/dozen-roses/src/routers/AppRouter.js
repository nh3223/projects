import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Welcome from '../components/Welcome';
import PlayRound from '../components/PlayRound';
import NotFound from '../components/NotFound';

const AppRouter = () => {

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