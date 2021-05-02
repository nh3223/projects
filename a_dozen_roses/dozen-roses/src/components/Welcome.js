import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Header from './Header';
import GlobalContext from '../context/GlobalContext';

import database from '../firebase/firebase';
import { calculateTotalScore } from '../utilities/updateScore';
import convertScore from '../utilities/convertScore';
import getProblems from '../utilities/getProblems';
import setUpTimes from '../utilities/setUpTimes';

const getTimes = async (uid, setTimes) => {
  const data = await database.ref(`users/${uid}`).once('value');
  let times = {};
  if (data.exists()) {
    data.forEach((problem) => {
      times[problem.key] = problem.val();
    });
  } else {
    times = setUpTimes();
    database.ref(`users/${uid}`).set(times);
  }
  setTimes(times);
}

const fetchProblems = async () => {
  const data = await database.ref('problems').once('value');
  const problems = data.val();
  return problems;
};

const gameSetUp = async (times, setTimes, setScore, problemData, setProblem, setRoundProblems) => {
  const score = calculateTotalScore(times);
  const userScore = convertScore(score);
  const roundProblems = getProblems(userScore.level, times, problemData);
  const firstProblem = roundProblems[0];  
  setScore(score)
  setTimes(times);
  setRoundProblems(roundProblems);
  setProblem(firstProblem);
};

const Welcome = () => {

  const { setScore, user, times, setTimes, problemData, setProblemData, setRoundProblems, setProblem } = useContext(GlobalContext);
  
  useEffect(() => {
    if (user.isAuthenticated) {
      gameSetUp(times, setTimes, setScore, problemData, setProblem, setRoundProblems);
    }
  }, [times])
  
  useEffect(() => {
    if (user.isAuthenticated) {
      getTimes(user.uid, setTimes);
    }
  }, [user]);
  
  useEffect(() => {
    const loadProblems = async () => {
      const problems = await fetchProblems();
      setProblemData(problems);
    };
    if (Object.keys(problemData).length === 0) {
      loadProblems();
    }
  }, []);

  return (
    <React.Fragment>
      <Header />
      <h1>Welcome to a Dozen Roses!</h1>
      <Link to="/play">
        <button disabled={!user.isAuthenticated}>Play Now!</button>      
      </Link>
    </React.Fragment>
  );
};

export default Welcome;