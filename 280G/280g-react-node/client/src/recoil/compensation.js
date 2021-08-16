import { atomFamily, selectorFamily } from "recoil";

import annualize from '../utilities/compensation';

export const startDate = atomFamily({
  key: 'startDate',
  default: new Date()
});

export const firstYearPayments = atomFamily({
  key: 'firstYearPayments',
  default: ''
});

export const basePeriodCompensation = atomFamily({
  key: 'basePeriodCompensation',
  default: [ ]
});

export const annualizedFirstYearCompensation = selectorFamily({
  key: 'annualizedFirstYearCompensation',
  get: executiveId => ({ get }) => annualize(get(startDate(executiveId)), get(firstYearPayments(executiveId)), get(basePeriodCompensation(executiveId)))
});