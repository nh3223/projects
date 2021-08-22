import { atomFamily, selectorFamily } from "recoil";

import annualize from '../utilities/compensation/compensation';

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

export const annualizedFirstYearCompensationState = selectorFamily({
  // parameter: executiveId
  key: 'annualizedFirstYearCompensation',
  get: executiveId => ({ get }) => annualize(get(startDateState(executiveId)), get(firstYearPaymentsState(executiveId)), get(basePeriodCompensationState(executiveId)))
});