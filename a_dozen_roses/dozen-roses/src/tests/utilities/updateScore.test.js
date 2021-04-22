import updateScore, { calculateScore } from '../../utilities/updateScore';

test('should calculate a score from a time', () => {
  expect(calculateScore(6500)).toBe(0.5);
  expect(calculateScore(12000)).toBe(0);
  expect(calculateScore(2000)).toBe(1);
});

test('should update the total score', () => {
  const score = 100;
  const oldTime = 10000;
  const newTime = 3000;
  expect(updateScore(score, oldTime, newTime)).toBe(101);
});