import setUpProblems from './setUpProblems';

const setUpScore = () => {
  let scores = setUpProblems()
  for (const level in scores) {
    for (const id in scores[level]) {
      delete scores[level][id].problem;
      delete scores[level][id].answer; 
      scores[level][id] = {
        time: 10000,
        score: 0
    };
    }
  }
  return scores;
};

export default setUpScore;