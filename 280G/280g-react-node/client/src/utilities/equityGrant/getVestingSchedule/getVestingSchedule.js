import { getCliffData } from '../getCliffData/getCliffData';
import { getRemainderData } from '../getRemainderData/getRemainderData';

export const getVestingSchedule = (transactionDate, equityGrantData) => {

  const { vestingSchedule, remainderShares } = getCliffData(transactionDate, equityGrantData);

  return getRemainderData(remainderShares, vestingSchedule, transactionDate, equityGrantData);

};