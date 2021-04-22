// export const getCurrentProblems = (problems, playerLevel) => {
//   let currentProblems = {}
//   for (let level = 1; level <= playerLevel; level++) {
//     currentProblems[level] = []
//   }
//   for (const id in problems) {
//     if (problems[id].level <= playerLevel) {
//       currentProblems[problems[id].level].push(id)
//     }
//   }
//   return currentProblems;
// };

// export const getLevelScore = (problems, scores) => {
//   const targetTime = 3000;
//   const maxTime = 10000;
//   const levelScore = problems.reduce((levelScore, id) => {
//     const time = Math.max(targetTime, Math.min(maxTime, scores[id]));
//     const score = (maxTime - time) / (maxTime - targetTime);
//     return levelScore + score;
//   }, 0);
//   return levelScore / problems.length;
// };

// export const getGameScore = (currentProblems, scores) => {
//   let gameScore = 0;
//   for (const level in currentProblems) {
//     const levelScore = getLevelScore(currentProblems[level], scores);
//     gameScore += levelScore;
//   }
//   return gameScore;
// };

// export const getCurrentScore = (gameScore) => {
//   const level = Math.min(Math.ceil(gameScore), 12);
//   const currentScore = 100 * (gameScore - level + 1);
//   return { 
//     level, 
//     score: currentScore
//   };
// };

// const scoreConversion = (problems, scores, playerLevel) => {
//   const currentProblems = getCurrentProblems(problems, playerLevel);
//   const gameScore = getGameScore(currentProblems, scores);
//   return getCurrentScore(gameScore);
// };
// export default scoreConversion;




const levelRanges = {
  1: { lower: 0, upper: 25 },
  2: { lower: 25, upper: 50 },
  3: { lower: 50, upper: 106 },
  4: { lower: 106, upper: 162 },
  5: { lower: 162, upper: 250 },
  6: { lower: 250, upper: 338 },
  7: { lower: 338, upper: 363 },
  8: { lower: 363, upper: 383 },
  9: { lower: 383, upper: 439 },
  10: { lower: 439, upper: 491 },
  11: { lower: 491, upper: 579 },
  12: { lower: 579, upper: 663 }
};

export const convertScore = (score) => {
  let currentLevelAndScore = {
    level: 1,
    score: 0,
  };
  for (let level = 1; level <= 12; level++) {
    if (score < levelRanges[level].upper) {
      currentLevelAndScore.level = level;
      currentLevelAndScore.score = 100 * ( score - levelRanges[level].lower ) / ( levelRanges[level].upper - levelRanges[level].lower );
      return currentLevelAndScore;
    }
  }
  return {
    level: 12,
    score: 100
  };
};

export default convertScore;