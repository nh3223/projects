import setUpTimes from '../../utilities/setUpTimes';
import setUpProblems from '../../utilities/setUpProblems';

test('should set up the times object with correct default values', () => {
  //const problems = setUpProblems();
  const problems = { 1: { level: 1 }};
  const times = setUpTimes(problems);
  expect(Object.keys(times).length).toBe(Object.keys(problems).length);
  expect(times[1]).toEqual({
    level: 1,
    time: 10000
  });
});