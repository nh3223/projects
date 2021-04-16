import { getPool, getWeightedPool, getSelectedProblems } from '../../utilities/getProblems';

test('should set up pool of problems given the level', () => {
  const level = 2;
  const scores = {
    '1': [1, 2, 3],
    '2': [4, 5, 6],
    '3': [7, 8, 9]
  }
  expect(getPool(level, scores)).toEqual([1,2,3,4,5,6])
});

test('should create a pool with weights', () => {
  const pool = [
    { 'time': 1 },
    { 'time': 3 },
    { 'time': 6 }
  ];
  expect(getWeightedPool(pool)).toEqual([
    { 'time': 1, 'weight': 0.1 },
    { 'time': 3, 'weight': 0.4 },
    { 'time': 6, 'weight': 1.00 }
  ]);
});


test('should select a random group of problems', () => {
  const pool = [
    { id: 1, weight: 0.1 },
    { id: 2, weight: 0.2 },
    { id: 3, weight: 0.5 },
    { id: 4, weight: 0.6 },
    { id: 5, weight: 1.0 }
  ]
  const problems = getSelectedProblems(pool, 3);
  const unique = [...new Set(problems)];
  expect(problems.length).toBe(3);
  expect(unique.length).toBe(3);
});