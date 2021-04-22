const setUpTimes = (problems) => {
  const numberOfProblems = Object.keys(problems).length;
  console.log(numberOfProblems);
  let times = {};
  for (let id = 1; id <= numberOfProblems; id++) {
    times[id] = {
      level: problems[id].level,
      time: 10000
    }
  }
  return times;
};

export default setUpTimes;