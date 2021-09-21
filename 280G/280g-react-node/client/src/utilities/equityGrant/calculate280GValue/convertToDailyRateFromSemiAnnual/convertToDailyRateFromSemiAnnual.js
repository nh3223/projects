export const convertToDailyRateFromSemiAnnual = (semiAnnualRate) => {
  
  const compoundingPeriods = 2;
  const daysInYear = 365;

  return (1 + semiAnnualRate) ** (compoundingPeriods / daysInYear) - 1;

};
