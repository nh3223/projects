import React, { useState, useEffect } from 'react';

import { calculateUpdatedScore } from '../utilities/updateScore';
import { convertScore } from '../utilities/convertScore';
import { getProblems } from '../utilities/getProblems';

import Problem from './Problem/Problem';
import { patchTimes } from '../firebase/times';

const PlayRound = ({ user, problems, score, times, updateTimes, updateScore, togglePlay }) => {

  const [ roundProblems, setRoundProblems ] = useState([]);
  const [ problem, setProblem ] = useState({});
  const [ index, setIndex ] = useState(0);
  const [ response, setResponse ] = useState('');
  const [ startTime, setStartTime ] = useState(0);
  
  const resetProblem = () => {
    setResponse('');
    setProblem(roundProblems[index + 1]);
    setIndex(index + 1);
    setStartTime(performance.now());
  };

  const resetRound = () => {
    setRoundProblems([]);
    setProblem(null);
    setIndex(null);
    setResponse('');
    togglePlay();
  };

  const handleChange = (e) => setResponse(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    const endTime = performance.now();
    const oldTime = times[problem.id]
    const newTime = (parseInt(response) === problem.answer) ? Math.round(endTime - startTime) : 10000;
    console.log('start', startTime, 'end', endTime);
    updateTimes(problem.id, newTime);
    updateScore(calculateUpdatedScore(score, oldTime, newTime));
    patchTimes(user.uid, problem.id, newTime);
    (index === 11) ? resetRound() : resetProblem()
  };

  useEffect(() => {
    if (roundProblems.length === 0) {
      const userScore = convertScore(score);
      const round = getProblems(userScore.level, times, problems);
      setRoundProblems(round);
      setProblem(round[0]);
      setStartTime(performance.now());
    }
  }, [roundProblems.length, score, times, problems])

  return <Problem problem={ problem.problem || '' } response={ response } handleChange={ handleChange } handleSubmit={ handleSubmit } />

};

export default PlayRound;