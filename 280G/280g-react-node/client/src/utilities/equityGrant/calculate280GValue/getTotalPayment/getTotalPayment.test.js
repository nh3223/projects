import { getTotalPayment } from "./getTotalPayment";

const accelerationBenefit = 10;
const serviceLapseValue = 50;

test('should return equity value when payment is a change of control payment', () => {
  const changeOfControl = true;
  const equityValue = 100;
  const totalPayment = getTotalPayment(changeOfControl, equityValue, accelerationBenefit, serviceLapseValue);
  expect(totalPayment).toBe(equityValue);
});

test('should return equity value when payment is not a change of control payment and equity value is less than sum of acceleration benefit and service lapse value', () => {
  const changeOfControl = false;
  const equityValue = 50;
  const totalPayment = getTotalPayment(changeOfControl, equityValue, accelerationBenefit, serviceLapseValue);
  expect(totalPayment).toBe(equityValue);
});

test('should return sum of acceleration benefit and service lapse value when sum is less than equity value and payment is not a change of control payment', () => {
  const changeOfControl = false;
  const equityValue = 100;
  const totalPayment = getTotalPayment(changeOfControl, equityValue, accelerationBenefit, serviceLapseValue);
  expect(totalPayment).toBe(accelerationBenefit + serviceLapseValue);
});



