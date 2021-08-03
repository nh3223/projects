import { atomFamily } from 'recoil';

// Parameter for grantIdsState is Executive Id

export const restrictedStockGrantIdsState = atomFamily({
  key: 'restrictStockGrantIds',
  default: []
});

// Parameter for grantState and vestingState is Grant Id

export const restrictedStockGrantState = atomFamily({
  key: 'restricteStockGrant',
  default: {
    grantDate: '',
    vestingStartDate: '',
    numberShares: '',
    changeOfControl: false,
    acceleration: false,
    accelerationPercentage: 100,
    accelerationMethod: 'Next to Vest',
    cliff: false,
    cliffDuration: 12,
    cliffPercentage: 25,
    remainderPeriods: '',
    remainderType: 'Monthly'
  }
});

export const restrictedStockVestingState = atomFamily({
  key: 'restrictedStockVesting',
  default: [{
    oldDate: '',
    newDate: '',
    shares: ''
  }]
});