import { endOfYear, getDaysInYear, differenceInCalendarDays, getYear } from 'date-fns';
import { parse } from '../date/date';

export const annualize = (startDate, firstYearPayments, firstCompensationYear) => {

  if (!startDate || !firstCompensationYear) return 0;
  
  const parsedStartDate = parse(startDate);
  const startYear = getYear(parsedStartDate);
  const firstBasePeriodYear = firstCompensationYear.year;

  if (startYear < firstBasePeriodYear) return firstCompensationYear.compensation; 

  const workingDays = differenceInCalendarDays( endOfYear(parsedStartDate), parsedStartDate) + 1;
  const annualizedCompensation = Math.round(firstYearPayments + (firstCompensationYear.compensation - firstYearPayments) * getDaysInYear(parsedStartDate) / workingDays);
  return annualizedCompensation;
};

export const getBaseAmount = (basePeriodCompensation, annualizedFirstYearCompensation) => {
  if (basePeriodCompensation.length === 0) return 0;
  const totalCompensation = basePeriodCompensation.reduce((total, year) => total + year.compensation, annualizedFirstYearCompensation) - basePeriodCompensation[0].compensation
  return totalCompensation / basePeriodCompensation.length;
}

export const getParachuteThreshold = (baseAmount) => baseAmount * 3;

export const getExcessParachutePayment = (totalPayments, parachuteThreshold, baseAmount) => (totalPayments < parachuteThreshold) ? 0 : totalPayments - baseAmount;

export const getExciseTax = (excessParachutePayment) => {
  const exciseTaxRate = 0.20;
  return excessParachutePayment * exciseTaxRate;
};

export const getWaiverAmount = (totalPayments, parachuteThreshold) => (totalPayments < parachuteThreshold || totalPayments === 0) ? 0 : totalPayments - parachuteThreshold + 1;