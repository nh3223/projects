import { atomFamily } from 'recoil';

export const restrictedStockGrantIdsState = atomFamily({
  // parameter: executiveId
  key: 'restrictedStockGrantIds',
  default: []
});

export const restrictedStockGrantDateState = atomFamily({
  // parameter: grantId
  key: 'restrictedStockGrantDate',
  default: ''
});

export const restrictedStockVestingStartDateState = atomFamily({
  // parameter: grantId
  key: 'restrictedStockVestingStartDate',
  default: ''
});

export const restrictedStockNumberSharesState = atomFamily({
  // parameter: grantId
  key: 'restrictedStockNumberShares',
  default: ''
});

export const restrictedStockChangeOfControlState = atomFamily({
  // parameter: grantId
  key: 'restrictedStockChangeOfControl',
  default: false
});

export const restrictedStockAccelerationState = atomFamily({
  // parameter: grantId
  key: 'restrictedStockAcceleration',
  default: false
});

export const restrictedStockAccelerationPercentageState = atomFamily({
  // parameter: grantId
  key: 'restrictedStockAccelerationPercentage',
  default: 100
});

export const restrictedStockAccelerationMethodState = atomFamily({
  // parameter: grantId
  key: 'restrictedStockAccelerationMethod',
  default: 'NextToVest'
});

export const restrictedStockCliffState = atomFamily({
  // parameter: grantId
  key: 'restrictedStockCliff',
  default: false
});

export const restrictedStockCliffDurationState = atomFamily({
  // parameter: grantId
  key: 'restrictedStockCliffDuration',
  default: 12
});

export const restrictedStockCliffPercentageState = atomFamily({
  // parameter: grantId
  key: 'restrictedStockCliffPercentage',
  default: 25
});

export const restrictedStockRemainderPeriodsState = atomFamily({
  // parameter: grantId
  key: 'restrictedStockRemainderPeriods',
  default: ''
});

export const restrictedStockRemainderType = atomFamily({
  // parameter: grantId
  key: 'restrictedStockRemainderType',
  default: 'Monthly'
});

export const restrictedStockVestingState = atomFamily({
  // parameter: grantId
  key: 'restrictedStockVesting',
  default: [{
    oldDate: '',
    newDate: '',
    shares: ''
  }]
});