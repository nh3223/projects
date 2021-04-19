export const getCurrentProblems = (problems, playerLevel) => {
  let currentProblems = {}
  for (let level = 1; level <= playerLevel; level++) {
    currentProblems[level] = []
  }
  for (const id in problems) {
    if (problems[id].level <= playerLevel) {
      currentProblems[problems[id].level].push(id)
    }
  }
  return currentProblems;
};

export const getLevelScore = (problems, scores) => {
  const targetTime = 3000;
  const maxTime = 10000;
  const levelScore = problems.reduce((levelScore, id) => {
    const time = Math.max(targetTime, Math.min(maxTime, scores[id]));
    const score = (maxTime - time) / (maxTime - targetTime);
    return levelScore + score;
  }, 0);
  return levelScore / problems.length;
};

export const getGameScore = (currentProblems, scores) => {
  let gameScore = 0;
  for (const level in currentProblems) {
    const levelScore = getLevelScore(currentProblems[level], scores);
    gameScore += levelScore;
  }
  return gameScore;
};

export const getCurrentScore = (gameScore) => {
  const level = Math.min(Math.ceil(gameScore), 12);
  const currentScore = 100 * (gameScore - level + 1);
  return { 
    level, 
    score: currentScore
  };
};

const scoreConversion = (problems, scores, playerLevel) => {
  const currentProblems = getCurrentProblems(problems, scores, playerLevel);
  const gameScore = getGameScore(currentProblems, scores);
  return getCurrentScore(gameScore);
};
export default scoreConversion;