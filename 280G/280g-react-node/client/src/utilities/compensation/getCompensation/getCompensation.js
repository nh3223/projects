export const getCompensation = (years, basePeriodCompensation) => {
  const compensation = { } 
  for (const year of years) {
    compensation[year] = (Object.keys(basePeriodCompensation).includes(year.toString())) ? basePeriodCompensation[year] : '';
  }
  return compensation;
};