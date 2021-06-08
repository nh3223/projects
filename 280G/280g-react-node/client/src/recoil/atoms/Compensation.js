import { atom } from 'recoil';

/* 

startDate object = {
  id: startDate(Date)
}

*/

export const startDateState = atom({
  key: 'startDateState',
  default: {}
});

/*

annualCompensation object = {
  id: {
    year(Number): compensation(Number)
  }
}

*/

export const annualCompensationState = atom({
  key: 'annualCompensationState',
  default: []
});
/*

objectElement = {
  executiveId: payments(Number)
}

*/

export const firstYearPaymentsState = atom({
  key: 'firstYearPaymentsState',
  default: {}
});