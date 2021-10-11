import { selectorFamily } from "recoil";

import { startDateState, firstYearPaymentsState, basePeriodCompensationState } from './compensation';
import { nonEquityPaymentIdsState, nonEquityPaymentAmountState } from './nonEquityPayment';
import { equityGrantIdsState, total280GValueState } from "./equityGrant";
import { annualize, getBaseAmount, getExcessParachutePayment, getExciseTax, getParachuteThreshold, getWaiverAmount } from "../utilities/analysis/analysis";

export const totalNonEquityPaymentsState = selectorFamily({
  // parameter: executiveId
  key: 'totalNonEquityPayments',
  get: (executiveId) => ({ get }) => {
    const paymentIds = get(nonEquityPaymentIdsState(executiveId));
    const totalNonEquityPayments = paymentIds.reduce((total, paymentId) => total + get(nonEquityPaymentAmountState(paymentId)), 0);
    return totalNonEquityPayments;
  }
});

export const totalEquityGrantPaymentsState = selectorFamily({
  // parameter: executiveId
  key: 'totalEquityGrantPayments',
  get: ({ companyId, executiveId }) => ({ get }) => {
    const grantIds = get(equityGrantIdsState(executiveId));
    const totalEquityGrantPayments = grantIds.reduce((total, grantId) => total + get(total280GValueState({ companyId, grantId })), 0);
    return totalEquityGrantPayments;
  }
});

export const totalPaymentsState = selectorFamily({
  //parameter: executiveId
  key: 'totalPayments',
  get: ({ companyId, executiveId }) => ({ get }) => {
    const totalNonEquityPayments = get(totalNonEquityPaymentsState(executiveId));
    const totalEquityGrantPayments = get(totalEquityGrantPaymentsState({ companyId, executiveId }));
    const totalPayments = totalNonEquityPayments + totalEquityGrantPayments;
    return { totalNonEquityPayments, totalEquityGrantPayments, totalPayments };
  }
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
    const parachuteThreshold = getParachuteThreshold(baseAmount);
    
    return { baseAmount, parachuteThreshold };
  }
});

export const analysisState = selectorFamily({
  // parameter: executiveId
  key: 'analysis',
  get: (executiveId) => ({ get }) => {
    
    const { baseAmount, parachuteThreshold } = get(baseAmountState(executiveId));
    
    const totalNonEquityPayments = get(totalNonEquityPaymentsState(executiveId));
    const totalEquityGrantPayments = get(totalEquityGrantPaymentsState(executiveId));
    const totalPayments = totalNonEquityPayments + totalEquityGrantPayments;
    
    const waiverAmount = getWaiverAmount(totalPayments, parachuteThreshold);
    const excessParachutePayment = getExcessParachutePayment(totalPayments, parachuteThreshold, baseAmount)
    const exciseTax = getExciseTax(excessParachutePayment);

    return { waiverAmount, excessParachutePayment, exciseTax }
  }
});