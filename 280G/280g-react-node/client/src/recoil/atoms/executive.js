import { atom, atomFamily, selectorFamily } from 'recoil';

// export const executivesState = atom({
//   key: 'executives',
//   default: []
// });



export const executiveState = atomFamily({
  key: 'executive',
  default: {}
});

export const executiveIdsState = atom({
  key: 'executiveIds',
  default: []
});

export const executivesState = selectorFamily({
  key: 'executives',
  get: (ids) => ({ get }) => ids.map((id) => get(executiveState(id)))
});
