import { atomFamily } from 'recoil';

export const nonEquityPaymentIdsState = atomFamily({
  key: 'nonEquityPaymentIds',
  default: []
})

export const nonEquityPaymentsState = atomFamily({
  key: 'nonEquityPayments',
  default: {
    _id: '',
    description: '',
    amount:  ''
  }
});
