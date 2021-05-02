import React, { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import database from '../firebase/firebase';
import GlobalContext from '../context/GlobalContext';
import updateScore from '../utilities/updateScore';

const updateTime = (id, time, times) => {
  times[id] = time;
  return times;
}

const Problem = () => {

  const { user, score, setScore, times, setTimes, problem, setProblem, roundProblems } = useContext(GlobalContext)
  const [ index, setIndex ] = useState(0);
  const [ response, setResponse ] = useState('');
  const [ startTime, setStartTime ] = useState(0);
  const history = useHistory();
  
  const onResponseChange = (e) => setResponse(e.target.value);

  const onSubmit = (e) => {
    e.preventDefault();
    const endTime = performance.now();
    const oldTime = times[problem.id];
    const newTime = (parseInt(response) === problem.answer) ? Math.round(endTime - startTime) : 10000;
    const newScore = updateScore(score, oldTime, newTime);
    const newTimes = updateTime(problem.id, newTime, times);    
    database.ref(`users/${user.uid}/${problem.id}`).set(newTime);
    setScore(newScore);
    setTimes(newTimes);
    setResponse('');
    setIndex(index + 1);
    setStartTime(performance.now());
  };

  useEffect(() => {
    (index === 12) ? history.push('/') : setProblem(roundProblems[index]);
  }, [index]);

  useEffect(() => {
    setStartTime(performance.now());
  }, [])

  return (
    <React.Fragment>
      <h1>{ [index,':', '-', problem.problem] }</h1>
      <form onSubmit={ onSubmit }>
        <input value={ response } onChange={ onResponseChange } />
        <button>Submit</button>
      </form>    
    </React.Fragment>
  );
};

export default Problem;

