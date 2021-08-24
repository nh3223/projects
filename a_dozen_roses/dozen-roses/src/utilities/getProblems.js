export const getPool = (level, times, problems) => {
  let pool = [];
  for (const id in times) {
    // Note: 13 replaces level temporarily to present all potential problemscd 
    if (problems[id].level <= 13) {
      pool.push({
        id,
        time: times[id]
      });
    }
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

export const getSelectedProblems = (pool,problems, numberOfProblems = 12) => {
  let selectedProblems = [];
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
  return selectedProblems.map((problem) => ({id: problem.id, ...problems[problem.id]}));
};

export const getProblems = (level, times, problems) => {
  const pool = getPool(level, times, problems);
  const weightedPool = getWeightedPool(pool);
  const selectedProblems = getSelectedProblems(weightedPool, problems);
  return selectedProblems;
};

export default getProblems;