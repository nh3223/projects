import { getPeriod } from '../../date/date';
import { getAFR } from './getAFR/getAFR';
import { getEquityValue } from './getEquityValue/getEquityValue';
import { getAccelerationBenefit } from './getAccelerationBenefit/getAccelerationBenefit';
import { getServiceLapseValue } from './getServiceLapseValue/getServiceLapseValue';
import { getTotalPayment } from './getTotalPayment/getTotalPayment'
import { getParachutePayment } from './getParachutePayment/getParachutePayment';

export const calculate280GValue = (transactionData, vestingData, equityGrantData) => {

  const { oldVestingDate, newVestingDate, shares } = vestingData;
  const { transactionDate } = transactionData;
  const { grantDate, changeOfControl } = equityGrantData;

  console.log(oldVestingDate, newVestingDate);

  const accelerationPeriod = getPeriod(oldVestingDate, newVestingDate);
  
  const afr = getAFR(accelerationPeriod);

  const equityValue = getEquityValue(transactionData, vestingData, equityGrantData); 

  console.log('accelerationBenefit', equityValue, afr, accelerationPeriod);

  const accelerationBenefit = getAccelerationBenefit(equityValue, afr, accelerationPeriod)

  const serviceLapseValue = getServiceLapseValue(accelerationPeriod, equityValue);

  const totalPayment = getTotalPayment(changeOfControl, equityValue, accelerationBenefit, serviceLapseValue);

  const parachutePayment = getParachutePayment(newVestingDate, transactionDate, totalPayment);

  console.log(equityValue, accelerationBenefit, serviceLapseValue);

  return {
    grantDate,
    oldVestingDate,
    newVestingDate,
    shares,
    equityValue,
    accelerationBenefit,
    serviceLapseValue,
    totalPayment,
    parachutePayment
  };

};