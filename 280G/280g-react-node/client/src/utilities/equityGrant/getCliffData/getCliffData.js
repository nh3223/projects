import { addMonth } from '../../date/date';
import { percentageAcceleratingCliffPeriod } from '../percentageAccelerating/percentageAccelerating';

export const getCliffData = (transactionData, equityGrantData) => {

  const { transactionDate } = transactionData;
  const { numberShares, vestingStartDate, cliff, cliffDuration, cliffPercentage } = equityGrantData;

  const defaultVestingData = {
    vestingSchedule: [ ],
    remainderShares: numberShares
  };

  const originalVestingDate = addMonth(vestingStartDate, cliffDuration);
  const acceleratedVestingDate = transactionDate;

  const cliffShares = numberShares * cliffPercentage / 100;
  
  const sharesAccelerating = cliffShares * percentageAcceleratingCliffPeriod(originalVestingDate, transactionDate, equityGrantData) / 100;

  const sharesNotAccelerating = cliffShares - sharesAccelerating;

  const cliffVestingData = [{
    originalVestingDate,
    acceleratedVestingDate,
    sharesNotAccelerating,
    sharesAccelerating
  }];

  const remainderShares = numberShares - cliffShares;

  return (cliff) ? { cliffVestingData, remainderShares } : defaultVestingData;

};