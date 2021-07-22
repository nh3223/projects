import { atom, atomFamily } from 'recoil';

export const executiveState = atomFamily({
  key: 'executive',
  default: { }
});

export const executiveIdsState = atom({
  key: 'executiveIds',
  default: []
});


