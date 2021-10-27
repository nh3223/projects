import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import 'normalize.css/normalize.css';
import './styles/styles.scss';

import AppRouter from './routers/AppRouter';
import configureStore from './store/configureStore';

const store = configureStore();

const aDozenRoses= (
  <Provider store={ store }>
    <AppRouter />
  </Provider>
);

ReactDOM.render(aDozenRoses, document.getElementById('app'));