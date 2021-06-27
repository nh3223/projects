import { atomFamily } from 'recoil';

export const nonEquityPaymentsState = atomFamily({
  key: 'nonEquityPayments',
  default: []
});
