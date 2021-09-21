import { stringify } from '../../../date/date';
import { getOptionValue } from './getOptionValue';

const transactionData = {
  transactionDate: stringify(new Date('December 1, 2021')),
  transactionPrice: 10
};

const equityGrantData = {
  grantDate: stringify(new Date('December 1, 2020')),
  exercisePrice: 5
};


test('should return the black scholes value', () => {
  const vestingData = {
    newVestingDate: stringify(new Date('December 1, 2022'))
  };
  const optionValue = getOptionValue(transactionData, vestingData, equityGrantData);
  expect(optionValue).toBeCloseTo(7.9864)  // calculated using an online calculator
});

test('should return the spread value', () => {
  const vestingData = {
    newVestingDate: transactionData.transactionDate
  };
  const optionValue = getOptionValue(transactionData, vestingData, equityGrantData);
  expect(optionValue).toBe(5)
});