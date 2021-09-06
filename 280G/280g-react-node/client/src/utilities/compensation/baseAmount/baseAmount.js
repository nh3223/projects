import { endOfYear, getDaysInYear, differenceInCalendarDays, getYear } from 'date-fns';

export const annualize = (startDate, firstYearPayments, firstCompensationYear) => {
  
  const startYear = getYear(startDate);
  const firstBasePeriodYear = firstCompensationYear.year;

  if (startYear < firstBasePeriodYear) return firstCompensationYear.compensation; 

  const workingDays = differenceInCalendarDays( endOfYear(startDate), startDate) + 1;
  const annualizedCompensation = Math.round(firstYearPayments + (firstCompensationYear.compensation - firstYearPayments) * getDaysInYear(startDate) / workingDays);
  return annualizedCompensation;
};

export const getBaseAmount = (basePeriodCompensation, annualizedFirstYearCompensation) => {
  // let totalCompensation = annualizedFirstYearCompensation;
  const totalCompensation = basePeriodCompensation.reduce((total, year) => total + year.compensation, annualizedFirstYearCompensation) - basePeriodCompensation[0].compensation
  return totalCompensation / basePeriodCompensation.length;
}

export const getParachuteThreshold = (baseAmount) => baseAmount * 3;