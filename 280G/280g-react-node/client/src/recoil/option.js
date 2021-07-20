import { atomFamily } from 'recoil';

// Parameter for grantIdsState is Executive Id

export const optionGrantIdsState = atomFamily({
  key: 'optionGrantIds',
  default: []
});

// Parameter for grantState and vestingState is Grant Id

export const optionGrantState = atomFamily({
  key: 'optionGrant',
  default: {    
    grantDate: null,
    vestingStartDate: null,
    numberOptions: '',
    exercisePrice: '',
    changeOfControlGrant: false,
    percentageAcceleration: 100,
    rollover: false,
    vestingSchedule: {
      cliff: true,
      cliffMonths: 12,
      cliffPercentage: 25,
      remainderPeriods: 36,
      remainderType: 'monthly'
    }
  }
});

export const optionVestingState = atomFamily({
  key: 'optionVesting',
  default: [{
    oldDate: '',
    newDate: '',
    options: ''
  }]
});