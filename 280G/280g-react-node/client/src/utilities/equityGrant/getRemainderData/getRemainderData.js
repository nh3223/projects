import { getVestingDateData } from "../getVestingDateData/getVestingDateData";
import { convertVestingData } from "../convertVestingData/convertVestingData";

export const getRemainderData = (remainderShares, vestingSchedule, transactionDate, equityGrantData) => {

  const { remainderPeriods } = equityGrantData;

  for (let period = 1; period <= remainderPeriods; period++) {
    const vestingDateData = getVestingDateData(period, remainderShares, transactionDate, equityGrantData);
    vestingSchedule.push(vestingDateData);
  };

  return convertVestingData(vestingSchedule);

};