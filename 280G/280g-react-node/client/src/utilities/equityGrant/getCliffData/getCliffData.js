import { addMonth } from '../../date/date';
import { percentageAcceleratingCliffPeriod } from '../percentageAccelerating/percentageAccelerating';

export const getCliffData = (transactionDate, equityGrantData) => {

  const { numberShares, vestingStartDate, cliff, cliffDuration, cliffPercentage } = equityGrantData;

  const defaultVestingData = {
    vestingSchedule: [ ],
    remainderShares: numberShares
  };

  const oldVestingDate = addMonth(vestingStartDate, cliffDuration);
  const acceleratedVestingDate = transactionDate;

  const cliffShares = numberShares * cliffPercentage / 100;
  
  const sharesAccelerating = cliffShares * percentageAcceleratingCliffPeriod(oldVestingDate, transactionDate, equityGrantData) / 100;

  const sharesNotAccelerating = cliffShares - sharesAccelerating;

  const cliffVestingData = [{
    oldVestingDate,
    acceleratedVestingDate,
    sharesNotAccelerating,
    sharesAccelerating
  }];

  const remainderShares = numberShares - cliffShares;

  return (cliff) ? { cliffVestingData, remainderShares } : defaultVestingData;

};