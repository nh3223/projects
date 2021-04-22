import React, { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import GlobalContext from '../context/GlobalContext';
import updateScore from '../utilities/updateScore';

const Problem = () => {

  const { score, setScore, times, setTimes, problem, setProblem, problemData, roundProblems } = useContext(GlobalContext)
  const [ index, setIndex ] = useState(0);
  const [ response, setResponse ] = useState('');
  const [ startTime, setStartTime ] = useState(0);
  const history = useHistory();
  console.log(problem)
  const onResponseChange = (e) => setResponse(e.target.value);

  const updateTime = (id, time) => {
    times[id].time = time;
    return times;
  }

  const onSubmit = (e) => {
    e.preventDefault();
    const endTime = performance.now();
    const oldTime = times[roundProblems[index]].time;
    const newTime = (parseInt(response) === problem.answer) ? Math.round(endTime - startTime) : 10000;
    const newScore = updateScore(score, oldTime, newTime);
    const newTimes = updateTime(roundProblems[index], newTime);
    setScore(newScore);
    setTimes(newTimes);
    setResponse('');
    setIndex(index + 1);
    setStartTime(performance.now());
  };

  useEffect(() => {
    if (index === 12) {
      history.push('/');
    } else {
      setProblem(problemData[roundProblems[index]]);
    }
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

