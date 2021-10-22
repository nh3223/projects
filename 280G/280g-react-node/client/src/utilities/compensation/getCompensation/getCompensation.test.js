import { getCompensation } from './getCompensation';

const years = [2018, 2019, 2020];

test('should return objects with year keys and empty string values if no basePeriodCompensation', () => {
  const basePeriodCompensation = [ ];
  expect(getCompensation(years, basePeriodCompensation)).toEqual([
    { year: 2018, compensation: '' },
    { year: 2019, compensation: '' },
    { year: 2020, compensation: '' }
  ]);
});

test('should return basePeriodCompensation if all years are the same', () => {
  const basePeriodCompensation = [
    { year: 2018, compensation: 100 },
    { year: 2019, compensation: 200 },
    { year: 2020, compensation: 300 }
  ];
  expect(getCompensation(years, basePeriodCompensation)).toEqual(basePeriodCompensation);
});


test('should return object with years in basePeriodCompensation included otherwise empty strings', () => {
  const basePeriodCompensation = [
    { year: 2019, compensation: 200 },
    { year: 2020, compensation: 300 }
  ];
  expect(getCompensation(years, basePeriodCompensation)).toEqual([
    { year: 2018, compensation: '' },
    ...basePeriodCompensation
  ]);
});