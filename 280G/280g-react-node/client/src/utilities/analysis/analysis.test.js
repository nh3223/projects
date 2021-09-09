import { annualize, getBaseAmount, getParachuteThreshold, getExcessParachutePayment, getExciseTax, getWaiverAmount } from "./analysis";
import { stringify } from '../date/date';

test('should return first base period year compensation when the start date is earlier', () => {
  const startDate = stringify(new Date('July 1, 2010'));
  const firstYearPayments = 0;
  const firstCompensationYear = {
    year: 2016,
    compensation: 200
  };
  const annualizedCompensation = annualize(startDate, firstYearPayments, firstCompensationYear);
  expect(annualizedCompensation).toEqual(200);
});

test('should return correct annualized first year compensation', () => {
  const startDate = stringify(new Date('September 1, 2018'));
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

test('should calculate the excess parachute payment', () => {
  const baseAmount = 100;
  const parachuteThreshold = 300;
  const payments1 = 200;
  const payments2 = 400;
  const excessParachutePayment1 = getExcessParachutePayment(payments1, parachuteThreshold, baseAmount);
  const excessParachutePayment2 = getExcessParachutePayment(payments2, parachuteThreshold, baseAmount);
  expect(excessParachutePayment1).toEqual(0);
  expect(excessParachutePayment2).toEqual(300);
});

test('should calculate the excise tax', () => {
  const excessParachutePayment = 500;
  const exciseTax = getExciseTax(excessParachutePayment);
  expect(exciseTax).toEqual(100);
});

test('should calculate the waiver amount', () => {
  const parachuteThreshold = 100;
  const payments1 = 50;
  const payments2 = 150;
  const waiver1 = getWaiverAmount(payments1, parachuteThreshold);
  const waiver2 = getWaiverAmount(payments2, parachuteThreshold);
  expect(waiver1).toEqual(0);
  expect(waiver2).toEqual(51);
})