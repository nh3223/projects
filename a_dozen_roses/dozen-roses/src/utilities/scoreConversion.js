const scoreConversion = (scores) => {
  let gameScore = 0
  for (const level in scores) {
    let levelScore = 0;
    for (const id in scores[level]) {
      levelScore += scores[level][id].score;
    }
    gameScore += levelScore / scores[level].length;
  }

  const level = Math.min(Math.ceil(gameScore), 12);
  const currentScore = 100 * (gameScore - level + 1);
  return { 
    level, 
    score: currentScore };
};

export default scoreConversion;