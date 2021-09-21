import { convertToDailyRateFromSemiAnnual } from "./convertToDailyRateFromSemiAnnual";

test('should return the correct daily rate given a semi-annual rate', () => {
  const semiAnnualRate = 0.10;
  const dailyRate = convertToDailyRateFromSemiAnnual(semiAnnualRate);
  expect(Math.round(dailyRate * 100000000)).toEqual(52238);
});