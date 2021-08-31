import { getYear } from 'date-fns';
import { parse } from '../../formatDate';

export const getYears = (startDate) => {
  if (startDate === '') return '';
  const startYear = getYear(parse(startDate));
  const currentYear = getYear(new Date());
  const firstCompensationYear = (startYear === currentYear) ? startYear : (startYear < currentYear - 5) ? currentYear - 5 : startYear;
  const lastCompensationYear = (startYear === currentYear) ? startYear : currentYear - 1;
  const basePeriod = [];
  for (let year=firstCompensationYear; year <= lastCompensationYear; year++) { 
    basePeriod.push(year);
  }
  return basePeriod;
};