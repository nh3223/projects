import { atomFamily } from 'recoil';

// Parameter for grantIdsState is Executive Id

export const restrictedStockGrantIdsState = atomFamily({
  key: 'restrictStockGrantIds',
  default: []
});

// Parameter for grantState and vestingState is Grant Id

export const restrictedStockGrantState = atomFamily({
  key: 'restricteStockGrant',
  default: {}
});

export const restrictedStockVestingState = atomFamily({
  key: 'restrictedStockVesting',
  default: {}
});