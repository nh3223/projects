// import { getCurrentProblems, getLevelScore, getGameScore, getCurrentScore } from '../../utilities/scoreConversion';
// import setUpProblems from '../../utilities/setUpProblems';

import convertScore from '../../utilities/convertScore';

test('should convert a total score into a level and level score', () => {
  expect(convertScore(0)).toEqual({
    level: 1,
    score: 0
  });
  expect(convertScore(30)).toEqual({
    level: 2,
    score: 20
  });
  expect(convertScore(663)).toEqual({
    level: 12,
    score: 100
  });
})


// test('should correctly return the current problems', () => {
//   const problems = setUpProblems()
//   const level = 12;
//   const currentProblems = getCurrentProblems(problems, level);
//   for (const level in currentProblems) {
//     console.log(level, currentProblems[level].length)
//   }
//   expect(getCurrentProblems(problems, level)).toEqual({
//     1: ['1', '2'],
//     2: ['3', '5']
//   });
// });

// test('should return the correcte levelScore', () => {
//   const problems1 = ['1','2','3'];
//   const problems2 = ['4','5','6','7'];
//   const times = {
//     1: 3000,
//     2: 3000,
//     3: 2000,
//     4: 3000,
//     5: 6500,
//     6: 6500,
//     7: 10000
//   };
//   const levelScore1 = getLevelScore(problems1, times);
//   const levelScore2 = getLevelScore(problems2, times);
//   expect(levelScore1).toBe(1);
//   expect(levelScore2).toBe(0.5);
// });

// test('should return the correct gameScore', () => {
//   const problems = {
//     1: ['1', '2', '3'],
//     2: ['4', '5', '6', '7']
//   };
//   const times = {
//     1: 3000,
//     2: 3000,
//     3: 2000,
//     4: 3000,
//     5: 6500,
//     6: 6500,
//     7: 10000
//   };
//   const gameScore = getGameScore(problems, times);
//   expect(gameScore).toBe(1.5);
// });

// test('should return the correct level and current score', () => {
//   const gameScore = 1.5;
//   const currentScore = getCurrentScore(gameScore);
//   expect(currentScore.level).toBe(2);
//   expect(currentScore.score).toBe(50);
// });