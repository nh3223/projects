import React from 'react';

import Header from './Header';
import Problem from './Problem';
// import getProblems from '../utilities/getProblems';
// import scoreConversion from '../utilities/scoreConversion';
// import GlobalContext from '../context/GlobalContext';


const PlayRound = () => {

  // const { score, problems } = useContext(GlobalContext);
  // const userScore = scoreConversion(score)
  // let roundProblems = getProblems(userScore.level, score);
  // roundProblems.map((id) => problems[id]);

  return (
    <React.Fragment>
      <Header />
      <Problem problem={{ problem: '1+1' }} />
    </React.Fragment>
  );
};

export default PlayRound;