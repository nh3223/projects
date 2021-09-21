import { stringify } from '../../../date/date';
import { getEquityValue } from './getEquityValue';

const transactionData = {
  transactionDate: stringify(new Date('December 1, 2021')),
  transactionPrice: 10
};

const vestingData = {
  newVestingDate: transactionData.transactionDate,
  shares: 10
};

const equityGrantData = {
  grantDate: stringify(new Date('December 1, 2020')),
  exercisePrice: 5
};

test('should return the value of restricted stock', () => {
  equityGrantData.grantType = 'Restricted Stock';
  const equityValue = getEquityValue(transactionData, vestingData, equityGrantData);
  expect(equityValue).toBe(100);
});

test('should return the options spread value', () => {
  equityGrantData.grantType = 'Option';
  const equityValue = getEquityValue(transactionData, vestingData, equityGrantData);
  expect(equityValue).toBe(50);
});