import { atom } from 'recoil';

import { stringify } from '../utilities/formatDate';

// export const companyState = atom({
//   key: 'company',
//   default: {
//     companyName: '',
//     transactionDate: stringify(new Date()),
//     transactionPrice: ''
//   }
// });

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

export const defaultCompany = {
  companyName: '',
  transactionDate: '',
  transactionPrice: ''
};