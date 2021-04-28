import React, { useState, useReducer } from 'react';

// The following lines were included once in development to set the problems to the firebase database
// import database from '../firebase/firebase';
// import setUpProblemms from '../utilities/setUpProblems';

import AppRouter from '../routers/AppRouter';
import GlobalContext from './GlobalContext';
import userReducer from '../reducers/user';

const GlobalProvider = () => {

  const [user, userDispatch] = useReducer(userReducer, { });
  const [problemData, setProblemData ] = useState({});
  const [roundProblems, setRoundProblems] = useState([])
  const [times, setTimes] = useState({});  
  const [index, setIndex] = useState(0);
  const [problem, setProblem] = useState({});
  const [score, setScore] = useState(0)
 
  // The following line was included once in development to set the problems to the firebase database
  // const [problemData] = useState(setUpProblems());
  // database.ref('problems').push(problemData);
  
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
      problemData,
      setProblemData
    }}>
      <AppRouter />
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;