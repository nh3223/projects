import { isVested } from '../isVested';


export const percentageAcceleratingCliffPeriod = (originalVestingDate, transactionDate, equityGrantData) => {

  const { acceleration, accelerationPercentage, cliffPercentage } = equityGrantData;

  if (isVested(originalVestingDate, transactionDate) || !acceleration) return 0;

  if (accelerationPercentage === 0 || accelerationPercentage === 100) return accelerationPercentage;

  return (accelerationPercentage > cliffPercentage) ? 100 : 100 * accelerationPercentage / cliffPercentage;

};


export const percentageAcceleratingRemainderPeriod = (originalVestingDate, transactionDate, period, equityGrantData) => {

  const { acceleration, accelerationPercentage, cliffPercentage, remainderPeriods } = equityGrantData;

  if (isVested(originalVestingDate, transactionDate) || !acceleration) return 0;

  if (accelerationPercentage === 0 || accelerationPercentage === 100) return accelerationPercentage;

  const remainderPeriodVestingPercentage = 100 / remainderPeriods;
  const periodVestingPercentage = 100 * (accelerationPercentage - cliffPercentage - (period - 1) * remainderPeriodVestingPercentage) / remainderPeriodVestingPercentage;

  return (periodVestingPercentage > 100) ? 100 : (periodVestingPercentage < 0) ? 0 : periodVestingPercentage;

};