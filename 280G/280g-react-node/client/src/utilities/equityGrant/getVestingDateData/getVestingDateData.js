import { addMonth, addQuarter, addYear } from '../../date/date';

const addPeriods = {
  'Monthly': addMonth,
  'Quarterly': addQuarter,
  'Annually': addYear
};

export const getVestingDateData = (period, remainderShares, transactionDate, equityGrantData) => {

  const { cliff, cliffDuration, vestingStartDate, remainderType, remainderPeriods, acceleration, accelerationPercentage } = equityGrantData;

  const cliffMonths = (cliff) ? cliffDuration : 0;
  const oldVestingDate = addPeriods[remainderType](addMonth(vestingStartDate, cliffMonths), period);
  const shares = remainderShares / remainderPeriods
  
  if (transactionDate > oldVestingDate || !acceleration) return [{
    oldVestingDate,
    newVestingDate: oldVestingDate,
    shares
  }];
  
  const newVestingDate = transactionDate;
  
  if (accelerationPercentage === 100) return [{
    oldVestingDate,
    newVestingDate,
    shares
  }];

  const sharesAccelerating = shares * accelerationPercentage / 100;
  const sharesNotAccelerating = shares - sharesAccelerating;
  
  const acceleratedVesting = {
    oldVestingDate,
    newVestingDate,
    shares: sharesAccelerating
  }

  const nonAcceleratedVesting = {
    oldVestingDate,
    newVestingDate: oldVestingDate,
    shares: sharesNotAccelerating
  }

  return [ acceleratedVesting, nonAcceleratedVesting ]

};

