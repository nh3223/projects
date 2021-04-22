import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import GlobalContext from '../context/GlobalContext';

import Header from './Header';
import convertScore from '../utilities/convertScore';
import getProblems from '../utilities/getProblems';

const Welcome = () => {

  const { score, times, problemData, setRoundProblems, setProblem } = useContext(GlobalContext);
  const userScore = convertScore(score);
  
  useEffect(() => {
    const problems = getProblems(userScore.level, times);
    const firstProblem = problemData[problems[0]];  
    setRoundProblems(problems);
    setProblem(firstProblem);
  }, [])

  return (
    <React.Fragment>
      <Header />
      <h1>Welcome to a Dozen Roses!</h1>
      <Link to="/play">
        <button>Play Now!</button>      
      </Link>
    </React.Fragment>
  );
};

export default Welcome;