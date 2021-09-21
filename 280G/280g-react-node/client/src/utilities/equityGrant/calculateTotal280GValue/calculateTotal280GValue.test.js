import { calculateTotal280GValue } from './calculateTotal280GValue';

const vestingData = [
  { shares: 10, parachutePayment: 100 },
  { shares: 10, parachutePayment: 200 },
  { shares: 20, parachutePayment: 300 }
];

test('should return the sum of the parachutePayments', () => {
  expect(calculateTotal280GValue(vestingData)).toBe(600);
});