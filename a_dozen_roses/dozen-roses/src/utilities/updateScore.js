export const calculateScore = (time) => {
  const targetTime = 3000;
  const maxTime = 10000;
  time = Math.max(targetTime, Math.min(time, maxTime));
  return ( maxTime - time ) / ( maxTime - targetTime );
};

const updateScore = (score, oldTime, newTime) => {
  const oldProblemScore = calculateScore(oldTime);
  const newProblemScore = calculateScore(newTime);
  return score - oldProblemScore + newProblemScore;
}

export const calculateTotalScore = (times) => {
  let totalScore = 0;
  for (const problem in times) {
    totalScore += calculateScore(times[problem]);
  }
  return totalScore;
}

export default updateScore;