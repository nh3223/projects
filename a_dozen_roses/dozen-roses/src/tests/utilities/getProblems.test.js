import { getPool, getWeightedPool, getSelectedProblems } from '../../utilities/getProblems';

test('should set up pool of problems given the level', () => {
  const level = 2;
  const times  = {
    1: { level: 1, time: 1},
    2: { level: 1, time: 1},
    3: { level: 2, time: 1},
    4: { level: 3, time: 1},
    5: { level: 3, time: 1}
  }
  expect(getPool(level, times)).toEqual([
    { id: '1', time: 1 },
    { id: '2', time: 1 },
    { id: '3', time: 1 }
  ]);
});

test('should create a pool with weights', () => {
  const pool = [
    { id: '1', time: 1 },
    { id: '2', time: 3 },
    { id: '3', time: 6 }
  ];
  expect(getWeightedPool(pool)).toEqual([
    { id: '1', time: 1, weight: 0.1 },
    { id: '2', time: 3, weight: 0.4 },
    { id: '3', time: 6, weight: 1.00 }
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