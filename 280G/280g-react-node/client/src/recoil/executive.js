import { atomFamily } from 'recoil';

export const executiveIdsState = atomFamily({
  // parameter: companyId
  key: 'executiveIds',
  default: []
});

export const executiveNameState = atomFamily({
  // parameter: executiveId
  key: 'executiveName',
  default: ''
});

export const executiveTitleState = atomFamily({
  // parameter: executiveId
  key: 'executiveTitle',
  default: ''
});

export const startDateState = atomFamily({
  // parameter: executiveId
  key: 'startDate',
  default: ''
});

export const firstYearPaymentsState = atomFamily({
  // parameter: executiveId
  key: 'firstYearPayments',
  default: ''
});

export const basePeriodCompensationState = atomFamily({
  // parameter: executiveId
  key: 'basePeriodCompensation',
  default: [ ]
});


