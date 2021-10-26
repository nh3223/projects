import { atomFamily, selectorFamily } from 'recoil';

import { calculate280GValue } from '../utilities/equityGrant/calculate280GValue/calculate280GValue';
import { calculateTotal280GValue } from '../utilities/equityGrant/calculateTotal280GValue/calculateTotal280GValue';
import { transactionDateState } from './company';
import { transactionPriceState } from './company';

export const equityGrantIdsState = atomFamily({
  // parameter: executiveId
  key: 'equityGrantIds',
  default: []
});

export const grantTypeState = atomFamily({
  // parameter: grantId
  key: 'grantType',
  default: 'Restricted Stock' // 'Option' is alternative
});

export const grantDateState = atomFamily({
  // parameter: grantId
  key: 'grantDate',
  default: ''
});

export const vestingStartDateState = atomFamily({
  // parameter: grantId
  key: 'vestingStartDate',
  default: ''
});

export const numberSharesState = atomFamily({
  // parameter: grantId
  key: 'numberShares',
  default: ''
});

export const exercisePriceState = atomFamily({
  // property not applicable to restricted stock
  // parameter: grantId
  key: 'exercisePrice',
  default: '' 
});

export const changeOfControlState = atomFamily({
  // parameter: grantId
  key: 'changeOfControl',
  default: false
});

export const accelerationState = atomFamily({
  // parameter: grantId
  key: 'acceleration',
  default: false
});

export const accelerationPercentageState = atomFamily({
  // parameter: grantId
  key: 'accelerationPercentage',
  default: 100
});

// export const accelerationMethodState = atomFamily({
//   // parameter: grantId
//   key: 'accelerationMethod',
//   default: 'NextToVest'
// });

export const cliffState = atomFamily({
  // parameter: grantId
  key: 'cliff',
  default: false
});

export const cliffDurationState = atomFamily({
  // parameter: grantId
  key: 'cliffDuration',
  default: 12
});

export const cliffPercentageState = atomFamily({
  // parameter: grantId
  key: 'cliffPercentage',
  default: 25
});

export const remainderPeriodsState = atomFamily({
  // parameter: grantId
  key: 'remainderPeriods',
  default: ''
});

export const remainderTypeState = atomFamily({
  // parameter: grantId
  key: 'remainderType',
  default: 'Monthly'
});

export const vestingScheduleState = atomFamily({
  // parameter: grantId
  key: 'vestingScheduleDate',
  default: []
});

export const total280GValueState = selectorFamily({
  // parameter: grantId
  key: 'total280gValue',
  get: ({ companyId, grantId }) => ({ get }) => {
    const vestingSchedule = get(vestingScheduleState(grantId));
    const transactionDate = get(transactionDateState(companyId));
    const transactionPrice = get(transactionPriceState(companyId));
    const grantType = get(grantTypeState(grantId));
    const grantDate = get(grantDateState(grantId));
    const exercisePrice = get(exercisePriceState(grantId));
    const changeOfControl = get(changeOfControlState(grantId));
    const transactionData = { transactionDate, transactionPrice };
    const equityGrantData = { grantType, grantDate, exercisePrice, changeOfControl };
    const analysis = vestingSchedule.map((vestingDate) => calculate280GValue(transactionData, vestingDate, equityGrantData));
    console.log(transactionData, equityGrantData);
    console.log('analysis', analysis);
    return calculateTotal280GValue(analysis);
  }
});