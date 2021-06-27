import { atom } from 'recoil';

export const companyState = atom({
  key: 'company',
  default: {}
});

export const companyCompletedState = atom({
  key: 'companyCompleted',
  default: {}
});