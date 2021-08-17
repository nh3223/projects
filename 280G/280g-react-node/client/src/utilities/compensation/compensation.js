import { getYear, endOfYear, getDaysInYear, differenceInCalendarDays } from 'date-fns';

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

export const convertCompensation = (compensation) => {

  if (!compensation) return {};
  const executiveCompensation = {}
  for (const year of compensation) {
    executiveCompensation[year.year] = year.compensation;
  }
  return executiveCompensation;
}

export const getYears = (startDate) => {
  const startYear = getYear(startDate);
  const currentYear = getYear(new Date())
  const firstCompensationYear = (startYear === currentYear) ? startYear : (startYear < currentYear - 5) ? currentYear - 5 : startYear;
  const lastCompensationYear = (startYear === currentYear) ? startYear : currentYear - 1;
  const basePeriod = [];
  for (let year=firstCompensationYear; year <= lastCompensationYear; year++) { 
    basePeriod.push(year);
  }
  return basePeriod;
};

export const getCompensation = (years, compensation) => {
  const basePeriodCompensation = { } 
  for (const year of years) {
    basePeriodCompensation[year] = (Object.keys(compensation).includes(year.toString())) ? compensation[year] : '';
  }
  return basePeriodCompensation;
};


