import { getVestingDateData } from "../getVestingDateData/getVestingDateData";
import { convertVestingData } from "../convertVestingData/convertVestingData";

export const getRemainderData = (remainderShares, vestingSchedule, transactionData, equityGrantData) => {

  const { remainderPeriods } = equityGrantData;

  for (let period = 1; period <= remainderPeriods; period++) {
    const vestingDateData = getVestingDateData(period, remainderShares, transactionData, equityGrantData);
    vestingSchedule.push(vestingDateData);
  };

  return convertVestingData(vestingSchedule);

};