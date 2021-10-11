import { addMonth, addQuarter, addYear } from '../../date/date';
import { percentageAcceleratingRemainderPeriod } from '../percentageAccelerating/percentageAccelerating';

const addPeriods = {
  'Monthly': addMonth,
  'Quarterly': addQuarter,
  'Annually': addYear
};

export const getVestingDateData = (period, remainderShares, transactionDate, equityGrantData) => {

  const { cliff, cliffDuration, vestingStartDate, remainderType, remainderPeriods } = equityGrantData;

  const cliffMonths = (cliff) ? cliffDuration : 0;
  const oldVestingDate = addPeriods[remainderType](addMonth(vestingStartDate, cliffMonths), period);
  const acceleratedVestingDate = transactionDate;
  
  const shares = remainderShares / remainderPeriods
  const sharesAccelerating = shares * percentageAcceleratingRemainderPeriod(oldVestingDate, transactionDate, period, equityGrantData) / 100;
  const sharesNotAccelerating = shares - sharesAccelerating;
  
  return {
    oldVestingDate,
    acceleratedVestingDate,
    sharesNotAccelerating,
    sharesAccelerating
  };

};

