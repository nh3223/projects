import { getServiceLapseValue } from "./getServiceLapseValue";

const accelerationPeriod = { months: 10 };
const equityValue = 100;

test('should return the correct service lapse value',() => {
  expect(getServiceLapseValue(accelerationPeriod, equityValue)).toBeCloseTo(10);
});