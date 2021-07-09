import { atomFamily } from 'recoil';

// Parameter for grantIdsState is Executive Id

export const grantIdsState = atomFamily({
  key: 'restrictStockGrantIds',
  default: []
});

// Parameter for grantState and vestingState is Grant Id

export const grantState = atomFamily({
  key: 'restricteStockGrant',
  default: {}
});

export const vestingState = atomFamily({
  key: 'restrictedStockVesting',
  default: {}
});