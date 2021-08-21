import { atomFamily, selectorFamily } from "recoil";

import annualize from '../utilities/compensation/compensation';

export const startDateState = atomFamily({
  key: 'startDate',
  default: ''
});

export const firstYearPaymentsState = atomFamily({
  key: 'firstYearPayments',
  default: ''
});

export const basePeriodCompensationState = atomFamily({
  key: 'basePeriodCompensation',
  default: [ ]
});

export const annualizedFirstYearCompensationState = selectorFamily({
  key: 'annualizedFirstYearCompensation',
  get: executiveId => ({ get }) => annualize(get(startDateState(executiveId)), get(firstYearPaymentsState(executiveId)), get(basePeriodCompensationState(executiveId)))
});