import { atom } from 'recoil';

export const companyState = atom({
  key: 'company',
  default: {
    _id: '',
    name: '',
    transactionDate: new Date(),
    transactionPrice: ''
  }
});

// export const companyNameState = atom({
//   key: 'companyName',
//   default: ''
// });

// export const transactionDateState = atom({
//   key: 'transactionDate',
//   default: new Date()
// });

// export const transactionPriceState = atom({
//   key: 'transactionPrice',
//   default: ''
// });