import { getCliffData } from '../getCliffData/getCliffData';
import { getRemainderData } from '../getRemainderData/getRemainderData';

export const getVestingSchedule = (transactionDate, equityGrantData) => {

  if (equityGrantData.vestingStartDate === '') return [];

  const { vestingSchedule, remainderShares } = getCliffData(transactionDate, equityGrantData);

  return getRemainderData(remainderShares, vestingSchedule, transactionDate, equityGrantData);

};