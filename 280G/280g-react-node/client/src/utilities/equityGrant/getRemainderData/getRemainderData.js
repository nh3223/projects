import { getVestingDateData } from "../getVestingDateData/getVestingDateData";

export const getRemainderData = (remainderShares, vestingSchedule, transactionDate, equityGrantData) => {

  const { remainderPeriods } = equityGrantData;

  for (let period = 1; period <= remainderPeriods; period++) {
    const vestingDateData = getVestingDateData(period, remainderShares, transactionDate, equityGrantData);
    vestingSchedule.push(...vestingDateData);
  };

  return vestingSchedule;

};