import { atom } from 'recoil';

export const companyNameState = atom({
  key: 'companyName',
  default: ''
});

export const transactionDateState = atom({
  key: 'transactionDate',
  default: ''
});

export const transactionPriceState = atom({
  key: 'transactionPrice',
  default: ''
});