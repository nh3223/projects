import { atomFamily } from 'recoil';

export const companyNameState = atomFamily({
  // parameter: companyId
  key: 'companyName',
  default: ''
});

export const transactionDateState = atomFamily({
  // parameter: companyId
  key: 'transactionDate',
  default: ''
});

export const transactionPriceState = atomFamily({
  // parameter: companyId
  key: 'transactionPrice',
  default: ''
});