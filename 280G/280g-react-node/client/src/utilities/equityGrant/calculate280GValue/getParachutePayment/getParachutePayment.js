import { getPeriod } from '../../../date/date';
import { getAFR } from '../getAFR/getAFR';
import { getPresentValue } from '../getPresentValue/getPresentValue';

export const getParachutePayment = (newVestingDate, transactionDate, totalPayment) => {

  if (newVestingDate <= transactionDate) return Number(totalPayment.toFixed(2));

  const remainingVestingPeriod = getPeriod(newVestingDate, transactionDate);
  const afr = getAFR(remainingVestingPeriod);

  const presentValue = getPresentValue(totalPayment, afr, remainingVestingPeriod)
  
  return Number(presentValue.toFixed(2));

};