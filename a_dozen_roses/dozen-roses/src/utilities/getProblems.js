export const getPool = (level, scores) => {
  let pool = [];
  for (let i = 1; i <= level; i++) {
    pool = pool.concat(scores[i.toString()]);
  }
  return pool;
}

export const getWeightedPool = (pool) => {
  const cumulativeTime = pool.reduce((cumulative, { time }) => cumulative + time, 0);
  let cumulativeWeight = 0;
  for (const problem of pool) {
    cumulativeWeight += problem.time / cumulativeTime;
    problem.weight = cumulativeWeight;
  }
  return pool;
};

export const getSelectedProblems = (pool, numberOfProblems = 12) => {
  const selectedProblems = [];
  while (selectedProblems.length < numberOfProblems) {
    const randomSelector = Math.random();
    let pick;
    for (const problem of pool) {
      if (problem.weight > randomSelector) {
        pick = problem;
        break;
      }
    }
    if (!selectedProblems.includes(pick)) {
      selectedProblems.push(pick);
    }
  }
  return selectedProblems.map((problem) => problem.id);
};

const getProblems = (level, scores) => {
  const pool = getPool(level, scores);
  const weightedPool = getWeightedPool(pool);
  const selectedProblems = getSelectedProblems(weightedPool);
  return selectedProblems;
  

};

export default getProblems;