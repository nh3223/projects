const setUpTimes = () => {
  const numberOfProblems = 663;
  let times = {};
  for (let id = 1; id <= numberOfProblems; id++) {
    times[id] = 10000;
  }
  return times;
};

export default setUpTimes;