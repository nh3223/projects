const scoreConversion = (scores) => {
  let gameScore = 0
  for (const level in scores) {
    const levelScore = scores[level].reduce((cumulativeScore, { score }) => cumulativeScore + score, 0);
    gameScore += levelScore / scores[level].length;
  }
  const level = Math.min(Math.ceil(gameScore), 12);
  const currentScore = 100 * (gameScore - level + 1);
  return { 
    level, 
    score: currentScore };
};

export default scoreConversion;