

export const addition = (a,b,id) => ({
  id,
  a,
  b,
  problem: `${a} + ${b}`,
  answer: a + b
});

export const subtraction = (a,b,id) => ({
  id,
  a,
  b,
  problem: `${a + b} - ${a}`,
  answer: b
});

export const multiplication = (a,b,id) => ({
  id,
  a,
  b,
  problem: `${a} x ${b}`,
  answer: a * b
});

export const division = (a,b,id) => ({
  id,
  a,
  b,
  problem: `${a * b} / ${a}`,
  answer: b
});

// TO COMPLETE: FIGURE OUT HOW TO SHOW DIVISION SYMBOL

export const problemFramework = () => {
  const problems = {};
  for (let i = 1; i <= 12; i++) {
    problems[`${i}`] = [];
  }
  return problems;
}

const getLevels = () => ([
  {
    operation: addition,
    levels: [1,3,5]
  },
  {
    operation: subtraction,
    levels: [2,4,6]
  },
  {
    operation: multiplication,
    levels: [7,9,11]
  },
  {
    operation: division,
    levels: [8,10,12]
  }
]);

const setupProblems = () => {
  const problems = problemFramework();
  const levels = getLevels()
  let id = 1;
  for (let a  = 0; a <= 12; a++) {
    for (let b = 0; b <= 12; b++) {
      for (let i = 0; i < 4; i++) {
        const problem = levels[i].operation(a,b,id);
        if (a <= 4 && b <= 4) {
          problems[levels[i].levels[0].toString()].push(problem);
        } else if (a <= 8 && b <= 8) {
          problems[levels[i].levels[1].toString()].push(problem);
        } else {
          problems[levels[i].levels[2].toString()].push(problem);
        }
      id++;
      }
    }
  }
  return problems;
}

export default setupProblems;
