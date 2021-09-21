import { getCliffData } from '../getCliffData/getCliffData';
import { getRemainderData } from '../getRemainderData/getRemainderData';

export const getVestingSchedule = (transactionData, equityGrantData) => {

  const { vestingSchedule, remainderShares } = getCliffData(transactionData, equityGrantData);

  return getRemainderData(remainderShares, vestingSchedule, transactionData, equityGrantData);

};