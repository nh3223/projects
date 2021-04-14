import React, { useReducer } from 'react';

import App from '../components/App';
import GlobalContext from './GlobalContext';
import userReducer from '../reducers/user';
import scoreReducer from '../reducers/score';

const GlobalProvider = () => {

  const [user, userDispatch] = useReducer(userReducer, { });
  const [score, scoreDispatch] = useReducer(scoreReducer, [] );
  
  return (
    <GlobalContext.Provider value = {{
      user,
      userDispatch,
      score,
      scoreDispatch,
    }}>
      <App />
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;