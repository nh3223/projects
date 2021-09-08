import { atom, atomFamily } from 'recoil';

export const projectNamesState = atom({
  key: 'projectNames',
  default: []
});

export const projectNameState = atomFamily({
  // parameter: companyId
  key: 'projectName',
  default: ''
});

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