import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Header from './Header';
import GlobalContext from '../context/GlobalContext';

import database from '../firebase/firebase';
import convertScore from '../utilities/convertScore';
import getProblems from '../utilities/getProblems';
import setUpTimes from '../utilities/setUpTimes';

const Welcome = () => {

  const { score, setTimes, setProblemData, setRoundProblems, setProblem } = useContext(GlobalContext);
  const userScore = convertScore(score);
  
  const fetchProblems = async () => {
    const data = await database.ref('problems').once('value');
    const key = process.env.REACT_APP_PROBLEMS_KEY;
    const problems = data.child(key).val();
    return problems;
  };

  const gameSetUp = async () => {
    const problems = await fetchProblems();
    const userTimes = setUpTimes(problems);
    const roundProblems = getProblems(userScore.level, userTimes);
    const firstProblem = problems[roundProblems[0]];  
    setProblemData(problems);
    setTimes(userTimes);
    setRoundProblems(roundProblems);
    setProblem(firstProblem);
  };

  useEffect(() => {
    gameSetUp();
  }, []);

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