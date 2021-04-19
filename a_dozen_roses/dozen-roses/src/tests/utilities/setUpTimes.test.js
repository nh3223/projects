import setUpTimes from '../../utilities/setUpTimes';

test('should set up the times object with correct default values', () => {
  const times = setUpTimes();
  expect(Object.keys(times).length).toBe(663);
  expect(times[1]).toBe(10000);
});