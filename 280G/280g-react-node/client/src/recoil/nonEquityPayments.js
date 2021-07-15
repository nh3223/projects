import { atom, atomFamily } from 'recoil';

export const nonEquityPaymentIdsState = atom({
  key: 'nonEquityPaymentIds',
  default: []
})

export const nonEquityPaymentsState = atomFamily({
  key: 'nonEquityPayments',
  default: {}
});
