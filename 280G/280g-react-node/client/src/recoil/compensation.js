import { atomFamily, selectorFamily } from "recoil";

import { annualize } from "../utilities/analysis/analysis";
import { getBaseAmount } from "../utilities/analysis/analysis";

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

export const baseAmountState = selectorFamily({
  // parameter: executiveId
  key: 'baseAmount',
  get: (executiveId) => ({ get }) => {
    const startDate = get(startDateState(executiveId));
    const firstYearPayments = get(firstYearPaymentsState(executiveId));
    const compensation = get(basePeriodCompensationState(executiveId));
  
    const firstBasePeriodCompensationYear = compensation[0];
    const annualizedCompensation = annualize(startDate, firstYearPayments, firstBasePeriodCompensationYear);
    const baseAmount = getBaseAmount(compensation, annualizedCompensation);
    return baseAmount;
  }
});