import { getAFR } from './getAFR';
import { convertToDailyRateFromSemiAnnual } from '../convertToDailyRateFromSemiAnnual/convertToDailyRateFromSemiAnnual';

const yearsShort = { years: 2 };
const yearsMid = { years: 4 };

const rateShort = 0.002;
const rateMid = 0.0103;
  
jest.mock('../convertToDailyRateFromSemiAnnual/convertToDailyRateFromSemiAnnual', () => ({
  convertToDailyRateFromSemiAnnual: (rate) => rate
}));

test('should return the mocked short term rate', () => {
  expect(getAFR(yearsShort)).toEqual(rateShort);
});

test('should return the mocked mid term ratee', () => {
  expect(getAFR(yearsMid)).toEqual(rateMid);
});