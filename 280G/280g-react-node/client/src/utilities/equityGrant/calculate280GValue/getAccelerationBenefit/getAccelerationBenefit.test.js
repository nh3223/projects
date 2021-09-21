import { getAccelerationBenefit } from "./getAccelerationBenefit";

const accelerationPeriod = { days: 10 };
const afr = 0.01;
const equityValue = 100;

test('should return the present value acceleration benefit', () => {
  const accelerationBenefit = getAccelerationBenefit(equityValue, afr, accelerationPeriod);
  expect(accelerationBenefit).toBeCloseTo(9.47)
});