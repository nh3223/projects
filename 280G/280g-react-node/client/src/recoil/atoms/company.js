import { atom } from 'recoil';

export const defaultCompanyState = {
  id: '',
  name: '',
  transactionPrice: '',
  transactionDate: '',
  executives: {}
};

export const defaultCompletedState = {
  name: false,
  transactionPrice: false,
  transactionDate: false
};

export const companyState = atom({
  key: 'company',
  default: defaultCompanyState
});

export const companyCompletedState = atom({
  key: 'companyCompleted',
  default: defaultCompletedState
});