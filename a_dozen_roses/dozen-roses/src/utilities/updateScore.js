export const calculateScore = (time) => {
  const targetTime = 3000;
  const maxTime = 10000;
  time = Math.max(targetTime, Math.min(time, maxTime));
  return Math.round(( maxTime - time ) / ( maxTime - targetTime ));
};

const updateScore = (score, oldTime, newTime) => {
  const oldProblemScore = calculateScore(oldTime);
  const newProblemScore = calculateScore(newTime);
  return score - oldProblemScore + newProblemScore;
}

export default updateScore;