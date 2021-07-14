import { atomFamily } from 'recoil';

// Parameter for grantIdsState is Executive Id

export const optionGrantIdsState = atomFamily({
  key: 'optionGrantIds',
  default: []
});

// Parameter for grantState and vestingState is Grant Id

export const optionGrantState = atomFamily({
  key: 'optionGrant',
  default: {}
});

export const optionVestingState = atomFamily({
  key: 'optionVesting',
  default: {}
});