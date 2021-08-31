import { atomFamily } from 'recoil';

export const equityGrantIdsState = atomFamily({
  // parameter: executiveId
  key: 'equityGrantIds',
  default: []
});

export const grantTypeState = atomFamily({
  // parameter: grantId
  key: 'grantType',
  default: 'restrictedStock' // 'option' is alternative
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

export const rolloverState = atomFamily({
  // parameter: grantId
  key: 'rollover',
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

export const accelerationMethodState = atomFamily({
  // parameter: grantId
  key: 'accelerationMethod',
  default: 'NextToVest'
});

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
  key: 'vestingSchedule',
  default: [{
    oldDate: '',
    newDate: '',
    shares: ''
  }]
});