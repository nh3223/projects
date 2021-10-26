import { addMonth } from '../../date/date';

export const getCliffData = (transactionDate, equityGrantData) => {

  const { numberShares, vestingStartDate, cliff, cliffDuration, cliffPercentage, acceleration, accelerationPercentage } = equityGrantData;

  if (!cliff) return {
    vestingSchedule: [ ],
    remainderShares: numberShares
  };

  const oldVestingDate = addMonth(vestingStartDate, cliffDuration);
  const cliffShares = numberShares * cliffPercentage / 100;
  const remainderShares = numberShares - cliffShares;

  if (!acceleration || oldVestingDate < transactionDate) return {
    vestingSchedule: [{
      oldVestingDate,
      newVestingDate: oldVestingDate,
      shares: cliffShares
    }],
    remainderShares
  };
    
  const newVestingDate = transactionDate;

  if (accelerationPercentage === 100) return {
    vestingSchedule: [{
      oldVestingDate,
      newVestingDate,
      shares: cliffShares
    }],
    remainderShares
  };
  
  const sharesAccelerating = cliffShares * accelerationPercentage / 100;
  const sharesNotAccelerating = cliffShares - sharesAccelerating;

  return {
    vestingSchedule: [
      {
        oldVestingDate,
        newVestingDate,
        shares: sharesAccelerating
      },
      {
        oldVestingDate,
        newVestingDate: oldVestingDate,
        shares: sharesNotAccelerating
      }
    ],
    remainderShares
  };

};