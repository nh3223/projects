import { convertCompensation, reconvertCompensation } from "../convertCompensation/convertCompensation";

export const getCompensation = (years, basePeriodCompensation) => {
  const convertedCompensation = convertCompensation(basePeriodCompensation);
  const compensation = { } 
  for (const year of years) {
    compensation[year] = (Object.keys(convertedCompensation).includes(year.toString())) ? convertedCompensation[year] : '';
  }
  return reconvertCompensation(compensation);
};