import { atom } from 'recoil';
import { formatISO } from 'date-fns';

export const companyState = atom({
  key: 'company',
  default: {
    _id: '',
    companyName: '',
    transactionDate: formatISO(new Date()),
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