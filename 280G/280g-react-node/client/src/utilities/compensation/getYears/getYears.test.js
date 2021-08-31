import { getYears } from './getYears';
import { stringify } from '../../formatDate'

test('should return empty string if no start date provided', () => {
  const startDate = '';
  expect(getYears(startDate)).toEqual('');
});

test('should return array with current year if start date in current year', () => {
  const startDate = stringify(new Date('July 1, 2021'));
  expect(getYears(startDate)).toEqual([2021]);
});

test('should return array with start date year if start date is last year', () => {
  const startDate = stringify(new Date('July 1, 2020'));
  expect(getYears(startDate)).toEqual([2020]);
});

test('should return array with less than 5 elements if start date was less than 5 years ago', () => {
  const startDate = stringify(new Date('July 1, 2018'));
  expect(getYears(startDate)).toEqual([2018, 2019, 2020]);
});

test('should return array with 5 elements if start daate is more than 5 years ago', () => {
  const maxYears = [2016, 2017, 2018, 2019, 2020];
  const startDate1 = stringify(new Date('July 1, 2016'));
  const startDate2 = stringify(new Date('July 1, 2015'));
  const startDate3 = stringify(new Date('July 1, 2000'));
  expect(getYears(startDate1)).toEqual(maxYears);
  expect(getYears(startDate2)).toEqual(maxYears);
  expect(getYears(startDate3)).toEqual(maxYears);
});