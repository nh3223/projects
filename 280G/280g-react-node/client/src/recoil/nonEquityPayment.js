import { atomFamily, selectorFamily } from 'recoil';

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

export const totalNonEquityPaymentsState = selectorFamily({
  // parameter: executiveId
  key: 'totalNonEquityPayments',
  get: (executiveId) => ({ get }) => {
    const paymentIds = get(nonEquityPaymentIdsState(executiveId));
    const totalPayments = paymentIds.reduce((total, paymentId) => total + get(nonEquityPaymentAmountState(paymentId)), 0);
    return totalPayments;
  }
});