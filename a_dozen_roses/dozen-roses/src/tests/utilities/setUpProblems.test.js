import setupProblems, { addition, subtraction, multiplication, division, problemFramework } from '../../utilities/setupProblems';

test('should create addition object', () => {
  expect(addition(2,3)).toEqual({
    problem: '2 + 3',
    answer: 5
  });
});

test('should create subraction object', () => {
  expect(subtraction(2,3)).toEqual({
    problem: '5 - 2',
    answer: 3
  });
});

test('should create multiplication object', () => {
  expect(multiplication(2,3)).toEqual({
    problem: '2 x 3',
    answer: 6
  });
});

test('should create division object', () => {
  expect(division(2,3)).toEqual({
    problem: '6 / 2',
    answer: 3
  });
});

test('should set up problems object', () => {
  const framework = problemFramework();
  expect(Object.keys(framework).length).toBe(12);
  expect(framework[7]).toEqual({});
});

test('should create problems', () => {
  const problems = setupProblems();
  expect(Object.keys(problems[1]).length).toBe(25);
  expect(Object.keys(problems[9]).length).toBe(56);
  expect(problems[1][1]).toEqual({ 
    problem: '0 + 0',
    answer: 0
  });
});