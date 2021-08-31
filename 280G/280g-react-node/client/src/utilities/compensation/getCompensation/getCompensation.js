export const getCompensation = (years, basePeriodCompensation) => {
  const compensation = { } 
  for (const year of years) {
    compensation[year] = (Object.keys(basePeriodCompensation).includes(year.toString())) ? basePeriodCompensation[year] : '';
  }
  return compensation;
};

// export const getCompensation = (years, basePeriodCompensation) => years.map((year) => {
//   let compensation = '';
//   for (const annualCompensationYear of basePeriodCompensation) {
//     if (annualCompensationYear.year === year) {
//       compensation = annualCompensationYear.compensation
//     }
//   }
//   return { year, compensation }
// });