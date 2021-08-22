import { atomFamily } from 'recoil';

export const nonEquityPaymentIdsState = atomFamily({
  // parameter: executiveId
  key: 'nonEquityPaymentIds',
  default: []
})

export const nonEquityPaymentDescriptionState = atomFamily({
  // parameter: paymentId
  key: 'nonEquityPaymentDescription',
  default: ''
});

export const nonEquityPaymentAmountState = atomFamily({
  // parameter: paymentId
  key: 'nonEquityPaymentAmount',
  default: ''
});