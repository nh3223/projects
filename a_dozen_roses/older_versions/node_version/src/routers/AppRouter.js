import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Dashboard from '../components/Dashboard';
import NotFound from '../components/NotFound';
import Header from '../components/Header';

const AppRouter = () => (
    <BrowserRouter>
        <Header />
        <Switch>
            <Route path="/" component={ Dashboard } exact={ true } />
            <Route component={ NotFound } />
        </Switch>
    </BrowserRouter>
);

export default AppRouter;