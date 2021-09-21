import { getPeriod } from '../../../date/date';
import { getAFR } from '../getAFR/getAFR';
import { getPresentValue } from '../getPresentValue/getPresentValue';

export const getParachutePayment = (newVestingDate, transactionDate, totalPayment) => {

  if (newVestingDate <= transactionDate) return totalPayment;

  const remainingVestingPeriod = getPeriod(newVestingDate, transactionDate);
  const afr = getAFR(remainingVestingPeriod);

  return getPresentValue(totalPayment, afr, remainingVestingPeriod);

};