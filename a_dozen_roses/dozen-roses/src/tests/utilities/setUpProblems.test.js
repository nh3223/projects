import setupProblems, { addition, subtraction, multiplication, division, getLevel } from '../../utilities/setupProblems';

test('should create addition object', () => {
  expect(addition(2,3,1)).toEqual({
    level: 1,
    problem: '2 + 3',
    answer: 5
  });
});

test('should create subraction object', () => {
  expect(subtraction(2,3,1)).toEqual({
    level: 1,
    problem: '5 - 2',
    answer: 3
  });
});

test('should create multiplication object', () => {
  expect(multiplication(2,3,1)).toEqual({
    level: 1,
    problem: '2 x 3',
    answer: 6
  });
});

test('should create division object', () => {
  expect(division(2,3,1)).toEqual({
    level: 1,
    problem: '6 / 2',
    answer: 3
  });
});

test('should return the level of a problem given a, b, and an array of 3 possible levels', () => {
  const levels = [1,2,3];
  expect(getLevel(1,1,levels)).toBe(1);
  expect(getLevel(1,6,levels)).toBe(2);
  expect(getLevel(5,7,levels)).toBe(2);
  expect(getLevel(5,10,levels)).toBe(3);
});

test('should create problems', () => {
  const problems = setupProblems();
  expect(Object.keys(problems).length).toBe(663);
  expect(problems[1]).toEqual({ 
    level: 1,
    problem: '0 + 0',
    answer: 0
  });
});