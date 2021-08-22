import { atomFamily } from 'recoil';

export const optionGrantIdsState = atomFamily({
  // parameter: executiveId
  key: 'optionGrantIds',
  default: []
});

export const optionGrantDateState = atomFamily({
  // parameter: grantId
  key: 'optionGrantDate',
  default: ''
});

export const optionVestingStartDateState = atomFamily({
  // parameter: grantId
  key: 'optionVestingStartDate',
  default: ''
});

export const optionNumberSharesState = atomFamily({
  // parameter: grantId
  key: 'optionNumberShares',
  default: ''
});

export const optionExercisePriceState = atomFamily({
  // parameter: grantId
  key: 'optionExercisePrice',
  default: ''
});

export const optionChangeOfControlState = atomFamily({
  // parameter: grantId
  key: 'optionChangeOfControl',
  default: false
});

export const optionRolloverState = atomFamily({
  // parameter: grantId
  key: 'optionRollover',
  default: false
});

export const optionAccelerationState = atomFamily({
  // parameter: grantId
  key: 'optionAcceleration',
  default: false
});

export const optionAccelerationPercentageState = atomFamily({
  // parameter: grantId
  key: 'optionAccelerationPercentage',
  default: 100
});

export const optionAccelerationMethodState = atomFamily({
  // parameter: grantId
  key: 'optionAccelerationMethod',
  default: 'NextToVest'
});

export const optionCliffState = atomFamily({
  // parameter: grantId
  key: 'optionCliff',
  default: false
});

export const optionCliffDurationState = atomFamily({
  // parameter: grantId
  key: 'optionCliffDuration',
  default: 12
});

export const optionCliffPercentageState = atomFamily({
  // parameter: grantId
  key: 'optionCliffPercentage',
  default: 25
});

export const optionRemainderPeriodsState = atomFamily({
  // parameter: grantId
  key: 'optionRemainderPeriods',
  default: ''
});

export const optionRemainderTypeState = atomFamily({
  // parameter: grantId
  key: 'optionRemainderType',
  default: 'Monthly'
});

export const optionVestingScheduleState = atomFamily({
  // parameter: grantId
  key: 'optionVesting',
  default: [{
    oldDate: '',
    newDate: '',
    shares: ''
  }]
});