import setUpScore from '../../utilities/setUpScores';

test('should set up the score object with correct default values', () => {
  const scores = setUpScore();
  expect(scores[1][1]).toEqual({
    time: 10000,
    score: 0
  });
});