import React, { useState, useReducer } from 'react';

import AppRouter from '../routers/AppRouter';
import GlobalContext from './GlobalContext';
import userReducer from '../reducers/user';
import setUpProblems from '../utilities/setUpProblems';
import setUpTimes from '../utilities/setUpTimes';

const GlobalProvider = () => {

  const [user, userDispatch] = useReducer(userReducer, { });
  const [problemData] = useState(setUpProblems());
  const [roundProblems, setRoundProblems] = useState([])
  const [times, setTimes] = useState(setUpTimes(problemData));  
  const [index, setIndex] = useState(0);
  const [problem, setProblem] = useState({});
  const [score, setScore] = useState(0)
 
  return (
    <GlobalContext.Provider value = {{
      user,
      userDispatch,
      times,
      setTimes,
      score,
      setScore,
      index,
      setIndex,
      problem,
      setProblem,
      roundProblems,
      setRoundProblems,
      problemData
    }}>
      <AppRouter />
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;