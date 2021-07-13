import setUpTimes from '../utilities/setUpTimes';
import { retrieveTimes, setTimes } from '../firebase/times';

export const getTimes = async (uid) => {
  const data = await retrieveTimes(uid);
  let times = {};
  if (data.exists()) {
    data.forEach((problem) => {
      times[problem.key] = problem.val();
    });
  } else {
    times = setUpTimes();
    setTimes(uid, times);
  }
  return times;
};

export default getTimes;