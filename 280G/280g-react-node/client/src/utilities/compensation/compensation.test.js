import { annualize, getBaseAmount, parachuteThreshold } from "./compensation";

test('calculates the Base Amount', () => {
  const annualizedFirstYearCompensation = 200;
  const basePeriodCompensation = [
    { 'year': 2016, 'compensation': 100 },
    { 'year': 2017, 'compensation': 200 },
    { 'year': 2018, 'compensation': 200 },
    { 'year': 2019, 'compensation': 200 },
    { 'year': 2020, 'compensation': 200 }
  ];
  expect(getBaseAmount(annualizedFirstYearCompensation, basePeriodCompensation)).toEqual(200);
  // expect(getBaseAmount(annualizedFirstYearCompensation, basePeriodCompensation)).toEqual(200);
});

test('calculates the Parachute Threshold', () => {
  const baseAmount = 200;
  expect(parachuteThreshold(baseAmount)).toEqual(600);
});

