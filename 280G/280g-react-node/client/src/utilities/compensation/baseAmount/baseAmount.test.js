import { annualize, getBaseAmount, getParachuteThreshold } from "./baseAmount";

test('should return first base period year compensation when the start date is earlier', () => {
  const startDate = new Date('July 1, 2010');
  const firstYearPayments = 0;
  const firstCompensationYear = {
    year: 2016,
    compensation: 200
  };
  const annualizedCompensation = annualize(startDate, firstYearPayments, firstCompensationYear);
  expect(annualizedCompensation).toEqual(200);
});

test('should return correct annualized first year compensation', () => {
  const startDate = new Date('September 1, 2018');
  const firstYearPayments = 100;
  const firstCompensationYear = {
    year: 2018,
    compensation: 1100
  };
  const annualizedFirstYearCompensation = annualize(startDate, firstYearPayments, firstCompensationYear);
  expect(annualizedFirstYearCompensation).toEqual(3092);
});


test('should calculate the base amount', () => {
  const basePeriodCompensation = [
    { year: 2018, compensation: 100 },
    { year: 2019, compensation: 200 },
    { year: 2020, compensation: 500 }
  ];
  const annualizedFirstYearCompensation = 200;
  const baseAmount = getBaseAmount(basePeriodCompensation, annualizedFirstYearCompensation);
  expect(baseAmount).toEqual(300);
});



test('should calculate the parachute threshold', () => {
  const baseAmount = 100;
  const parachuteThreshold = getParachuteThreshold(baseAmount);
  expect(parachuteThreshold).toEqual(baseAmount * 3);
});