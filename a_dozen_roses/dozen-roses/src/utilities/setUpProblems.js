

export const addition = (a,b, level) => ({
  level,
  problem: `${a} + ${b}`,
  answer: a + b
});

export const subtraction = (a,b, level) => ({
  level,
  problem: `${a + b} - ${a}`,
  answer: b
});

export const multiplication = (a,b, level) => ({
  level,
  problem: `${a} x ${b}`,
  answer: a * b
});

export const division = (a,b,level) => ({
  level,
  problem: `${a * b} / ${a}`,
  answer: b
});

// TO COMPLETE: FIGURE OUT HOW TO SHOW DIVISION SYMBOL

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

export const getLevel = (a,b,levels) => {
  if (a <= 4 && b <= 4) {
    return levels[0];
  } else if (a <= 8 && b <= 8) {
    return levels[1];
  }
  return levels[2];
};

const setupProblems = () => {
  let problems = {};
  const levels = getLevels()
  let id = 1;
  for (let a  = 0; a <= 12; a++) {
    for (let b = 0; b <= 12; b++) {
      for (let i = 0; i < 4; i++) {
        const operation = levels[i].operation;
        const level = getLevel(a,b,levels[i].levels);
        if (!(operation === division && a === 0)) {
          const problem = operation(a, b, level);
          problems[id] = problem;
          id++;
        }
      }
    }
  }
  return problems;
}

export default setupProblems;

