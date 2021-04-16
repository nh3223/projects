const scoreConversion = (scores) => {
  let gameScore = 0
  for (const level in scores) {
    const levelScore = level.reduce((cumulativeScore, { score }) => cumulativeScore + score);
    gameScore += levelScore / level.length;
  }
  const level = Math.min(Math.ceil(gameScore), 12);
  const currentScore = 100 * (gameScore - level + 1);
  return { 
    level, 
    score: currentScore };
};

export default scoreConversion;