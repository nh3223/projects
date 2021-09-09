import { atomFamily } from "recoil";

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