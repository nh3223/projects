import { stringify } from '../../../date/date';
import { getBlackScholes } from './getBlackScholes';

const transactionData = {
  transactionDate: stringify(new Date('December 1, 2021')),
  transactionPrice: 10
};

const equityGrantData = {
  grantDate: stringify(new Date('December 1, 2020')),
  exercisePrice: 5
};


test('should return the black scholes value', () => {
  const blackScholesValue = getBlackScholes(transactionData, equityGrantData);
  expect(blackScholesValue).toBeCloseTo(7.9864)  // calculated using an online calculator
});