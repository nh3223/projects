import { atomFamily } from 'recoil';

export const executiveIdsState = atomFamily({
  // parameter: companyId
  key: 'executiveIds',
  default: []
});

export const executiveNameState = atomFamily({
  // parameter: executiveId
  key: 'executiveName',
  default: ''
});

export const executiveTitleState = atomFamily({
  // parameter: executiveId
  key: 'executiveTitle',
  default: ''
});

