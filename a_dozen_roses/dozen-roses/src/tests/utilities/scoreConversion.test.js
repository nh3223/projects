import scoreConversion from '../../utilities/scoreConversion';

test('should correctly return the level and current score', () => {
  const scores = {
    '1': [ { score: 1}, {score: 1}, {score: 1 }],
    '2': [ { score: 1}, {score: 0.5}, {score: 0.5}, {score: 0 } ]
  };
  const score = scoreConversion(scores)
  expect(score.level).toBe(2);
  expect(score.score).toBe(50);
});