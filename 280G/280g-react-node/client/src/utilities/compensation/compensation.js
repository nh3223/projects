import { endOfYear, getDaysInYear, differenceInCalendarDays } from 'date-fns';

export const annualize = (startDate, firstYearPayments, basePeriodCompensation) => {
  const workingDays = differenceInCalendarDays( endOfYear(startDate), startDate) + 1
  const firstYearCompensation = basePeriodCompensation[0].compensation;
  return firstYearPayments + (firstYearCompensation - firstYearPayments) * getDaysInYear(startDate) / workingDays
};

export const getBaseAmount = (annualizedFirstYearCompensation, basePeriodCompensation) => {
  // let totalCompensation = annualizedFirstYearCompensation;
  const remainingYearsCompensation = basePeriodCompensation.reduce((total, year) => total + year.compensation, 0) - basePeriodCompensation[0].compensation
  return (annualizedFirstYearCompensation + remainingYearsCompensation) / basePeriodCompensation.length;
}

export const parachuteThreshold = (baseAmount) => baseAmount * 3;

export const waiverAmount = (parachuteThreshold, payments) => {
  return (payments < parachuteThreshold) ? 0 : payments - parachuteThreshold + 1;
}

