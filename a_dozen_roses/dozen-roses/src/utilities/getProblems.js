const getPool = (level, scores) => {
  let pool = [];
  for (let i = 1; i <= level; i++) {
    pool.concat(scores[i.toString()]);
  }
  return pool;
}

const getWeightedPool = (pool) => {
  const cumulativeTime = pool.reduce((cumulative, { time }) => cumulative + time);
  let cumulativeWeight = 0;
  for (const problem of pool) {
    cumulativeWeight += problem.time / cumulativeTime;
    problem.weight = cumulativeWeight;
  }
  return pool;
};

const getProblems = (level, scores) => {
  const pool = getPool(level, scores);
  const weightedPool = getWeightedPool(pool);
  const selectedProblems = [];
  while (selectedProblems.length < 12) {
    const randomSelector = Math.random();
    let pick;
    for (const problem of weightedPool) {
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

export default getProblems;