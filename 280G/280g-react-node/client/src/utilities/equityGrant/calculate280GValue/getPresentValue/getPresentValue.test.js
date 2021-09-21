import { getPresentValue } from "./getPresentValue";

const payment = 100;
const afr = 0.01;
const period = { days: 10 };

test('expect correct present value to be returned', () => {
  const presentValue = getPresentValue(payment, afr, period);
  expect(presentValue).toBeCloseTo(90.53)
});