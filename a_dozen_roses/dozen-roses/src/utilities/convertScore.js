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
  const float = 0.001;
  let currentLevelAndScore = {
    level: 1,
    score: 0,
  };
  for (let level = 1; level <= 12; level++) {
    if (score + float < levelRanges[level].upper) {
      currentLevelAndScore.level = level;
      currentLevelAndScore.score = Math.round(100 * ( score - levelRanges[level].lower ) / ( levelRanges[level].upper - levelRanges[level].lower ));
      return currentLevelAndScore;
    }
  }
  return {
    level: 12,
    score: 100
  };
};