import { atom } from 'recoil';

export const companyNameState = atom({
  key: 'companyName',
  default: ''
});

export const transactionDateState = atom({
  key: 'transactionDate',
  default: new Date()
});

export const transactionPriceState = atom({
  key: 'transactionPrice',
  default: ''
});