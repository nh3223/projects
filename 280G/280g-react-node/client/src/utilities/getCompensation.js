import { getYear } from 'date-fns';

const convertCompensation = (compensation) => {
  const executiveCompensation = {}
  for (const year of compensation) {
    executiveCompensation[year.year] = year;
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

export const getCompensation = (years, executiveCompensation) => {
  const annualCompensation = convertCompensation(executiveCompensation);
  const compensation = {};
  for (const year of years) {
    const comp = annualCompensation[year].compensation;
    compensation[year] = (Object.keys(annualCompensation).includes(year.toString()))
    ? {
      year,
      compensation: comp,
      completed: (comp) ? true : false,
      edit: false,
      error: false
    }
    : {
      year,
      compensation: '',
      completed: false,
      edit: false,
      error: false
    }
  }
  return compensation;
};


