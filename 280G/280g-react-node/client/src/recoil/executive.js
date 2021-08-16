import { atom, atomFamily, selectorFamily } from 'recoil';

export const executiveState = atomFamily({
  key: 'executive',
  default: { }
});

export const executiveIdsState = atom({
  key: 'executiveIds',
  default: []
});


export const executivePortal = selectorFamily({
  key: 'executivePortal',
  get: (executiveId) => ({ get }) => get(executiveState(executiveId)),
  set: (executiveId) => ({ set }, executive) => {
    set(executiveState(executiveId), executive);
    set(executiveIdsState, [ executiveId, ...executiveIdsState]);
  }
});


export const executiveName = atomFamily({
  key: 'executiveName',
  default: ''
});

export const executiveTitle = atomFamily({
  key: 'executiveTitle',
  default: ''
});

