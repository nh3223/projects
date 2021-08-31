import { getCompensation } from './getCompensation';

const years = [2018, 2019, 2020];

test('should return objects with year keys and empty string values if no basePeriodCompensation', () => {
  const basePeriodCompensation = { };
  expect(getCompensation(years, basePeriodCompensation)).toEqual({
    2018: '',
    2019: '',
    2020: ''
  });
});

test('should return basePeriodCompensation if all years are the same', () => {
  const basePeriodCompensation = {
    2018: 100,
    2019: 200,
    2020: 300
  };
  expect(getCompensation(years, basePeriodCompensation)).toEqual(basePeriodCompensation);
});


test('should return object with years in basePeriodCompensation included otherwise empty strings', () => {
  const basePeriodCompensation = {
    2019: 200,
    2020: 300
  };
  expect(getCompensation(years, basePeriodCompensation)).toEqual({
    2018: '',
    ...basePeriodCompensation
  });
});