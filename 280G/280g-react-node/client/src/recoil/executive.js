import { atom, atomFamily } from 'recoil';

export const executiveState = atomFamily({
  key: 'executive',
  default: {
    _id: '',
    name: '',
    title: '',
    startDate: '',
    firstYearPayments: '',
    basePeriodCompensation: {}
  }
});

export const executiveIdsState = atom({
  key: 'executiveIds',
  default: []
});

export const startDateState = atomFamily({
  key: 'startDate',
  default: null
});

export const firstYearPaymentsState = atomFamily({
  key: 'firstYearPayments',
  default: ''
});

export const basePeriodCompensationState = atomFamily({
  key: 'transactionPrice',
  default: []
});


