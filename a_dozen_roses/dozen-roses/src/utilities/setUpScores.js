import setUpProblems from './setUpProblems';

const setUpScore = () => {
  const scores = setUpProblems()
  for (const level in scores) {
    level.map((problem) => ({
      id: problem.id,
      'time': 10000,
      'score': 0
    }));
  }
};

export default setUpScore;