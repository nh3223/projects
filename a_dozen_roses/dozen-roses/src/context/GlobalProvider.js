import React, { useReducer } from 'react';

import AppRouter from '../routers/AppRouter';
import GlobalContext from './GlobalContext';
import userReducer from '../reducers/user';
import scoreReducer from '../reducers/score';
import setUpProblems from '../utilities/setUpProblems';

const GlobalProvider = () => {

  const [user, userDispatch] = useReducer(userReducer, { });
  const [score, scoreDispatch] = useReducer(scoreReducer, [] );
  const problems = setUpProblems();
  
  return (
    <GlobalContext.Provider value = {{
      user,
      userDispatch,
      score,
      scoreDispatch,
      problems
    }}>
      <AppRouter />
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;