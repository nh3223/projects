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
    _id: '',
    grantDate: null,
    vestingStartDate: null,
    numberShares: '',
    changeOfControlGrant: false,
    percentageAcceleration: 100,
    accelerationMethod: 'Next to Vest',
    vestingDetails: {
      cliff: true,
      cliffMonths: 12,
      cliffPercentage: 25,
      remainderPeriods: 36,
      remainderType: 'monthly'
    }
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