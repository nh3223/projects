import { stringify } from '../../../date/date';
import { getParachutePayment } from './getParachutePayment';

const transactionDate = stringify(new Date('December 1, 2021'));
const totalPayment = 100;

test('should return total payment if newVestingDate is on or before the transaction date', () => {
  
  let newVestingDate = stringify(new Date('December 1, 2020'));
  let parachutePayment = getParachutePayment(newVestingDate, transactionDate, totalPayment);
  expect(parachutePayment).toBe(totalPayment);
  
  newVestingDate = transactionDate;
  parachutePayment = getParachutePayment(newVestingDate, transactionDate, totalPayment)
  expect(parachutePayment).toBe(totalPayment);

});

test('should return the present value of the payment if new vesting date is after the transaction date', () => {
  
  let newVestingDate = stringify(new Date('December 1, 2022'));
  const parachutePaymentShort = getParachutePayment(newVestingDate, transactionDate, totalPayment)
  expect(parachutePaymentShort).toBeLessThan(totalPayment);
  
  newVestingDate = stringify(new Date('December 1, 2025'));
  const parachutePaymentMid = getParachutePayment(newVestingDate, transactionDate, totalPayment)
  expect(parachutePaymentMid).toBeLessThan(parachutePaymentShort);

});
