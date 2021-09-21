import { getPresentValue } from '../getPresentValue/getPresentValue';

export const getAccelerationBenefit = (equityValue, afr, accelerationPeriod) => equityValue - getPresentValue(equityValue, afr, accelerationPeriod);