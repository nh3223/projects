import React, { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import GlobalContext from '../context/GlobalContext';

const Problem = () => {

  const { problem, setProblem, problemData, roundProblems } = useContext(GlobalContext)
  const [ index, setIndex ] = useState(0);
  const history = useHistory();
  console.log('in Problem', roundProblems);
  console.log(problem);

  const onSubmit = (e) => {
    e.preventDefault();
    setIndex(index + 1);
  };

  useEffect(() => {
    if (index === 12) {
      history.push('/');
    } else {
      setProblem(problemData[roundProblems[index]]);
    }
  }, [index]);

  return (
    <React.Fragment>
      <h1>{ [index,':', '-', problem.problem] }</h1>
      <form onSubmit={ onSubmit }>
        <input />
        <button>Submit</button>
      </form>    
    </React.Fragment>
  );
};

export default Problem;

