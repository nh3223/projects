import React from 'react';
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import { RecoilRoot } from 'recoil';

import { stringify, formatDate } from "../../../../../utilities/date/date";
import { useSetEquityGrantTestData } from '../../../../../tests/hooks/useSetEquityGrantTestData'
import { useSetVestingScheduleTestData } from '../../../../../tests/hooks/useSetVestingScheduleTestData';
import { useSetCompanyTestData } from '../../../../../tests/hooks/useSetCompanyTestData';

import EquityGrantTable from './EquityGrantTable';

const InitializeState = ({ companyId, grantId, transactionDate, transactionPrice, vestingSchedule, grantType, grantDate, changeOfControl }) => {

  const loadingSchedule = useSetVestingScheduleTestData({ grantId, vestingSchedule });

  const loadingCompany = useSetCompanyTestData({ companyId, transactionDate, transactionPrice });

  const loadingGrant = useSetEquityGrantTestData({ grantId, grantType, grantDate, changeOfControl });

  return ( loadingSchedule || loadingCompany || loadingGrant ) ? null : <EquityGrantTable companyId={ companyId } grantId={ grantId } />

};

const component = (companyId, grantId, transactionDate, transactionPrice, vestingSchedule, grantType, grantDate, changeOfControl) => (
  <RecoilRoot>
    <InitializeState companyId={ companyId } grantId={ grantId } transactionDate = {transactionDate } transactionPrice={ transactionPrice }
                     vestingSchedule={ vestingSchedule } grantType={ grantType } grantDate={ grantDate } changeOfControl={ changeOfControl } />
  </RecoilRoot>
);

const companyId = 12;
const grantId = 7;
const transactionDate = stringify(new Date('December 1, 2021'));
const transactionPrice = 10;
const grantType = 'Restricted Stock';
const grantDate = stringify(new Date('January 1, 2020'));
const changeOfControl = false;
const vestingDate1 = stringify(new Date('January 1, 2021'));
const vestingDate2 = stringify(new Date('January 1, 2022'));
const vestingDate3 = stringify(new Date('January 1, 2023'));
const vestingDate4 = stringify(new Date('January 1, 2024'));
const vestingSchedule = [
  { oldVestingDate: vestingDate1, newVestingDate: vestingDate1, shares: 100 },
  { oldVestingDate: vestingDate2, newVestingDate: transactionDate, shares: 100 },
  { oldVestingDate: vestingDate3, newVestingDate: transactionDate, shares: 100 },
  { oldVestingDate: vestingDate4, newVestingDate: transactionDate, shares: 100 }
];

jest.mock('../../../../../hooks/useSetVestingData', () => ({
  useSetVestingData: () => null
}));

test('should show correct new and old vesting dates and shares', () => {
  const { getByDisplayValue, getAllByDisplayValue, getByText } = render(component(companyId, grantId, transactionDate, transactionPrice, vestingSchedule, grantType, grantDate, changeOfControl));
  const oldVestingDate1 = getByText(formatDate(vestingDate1));
  const oldVestingDate2 = getByText(formatDate(vestingDate2));
  const oldVestingDate3 = getByText(formatDate(vestingDate3));
  const oldVestingDate4 = getByText(formatDate(vestingDate4));
  const newVestingDate1 = getByDisplayValue('01/01/2021');
  const acceleratedVestingDates = getAllByDisplayValue('12/01/2021');
  const shares = getAllByDisplayValue('100');
  expect(oldVestingDate1).toBeInTheDocument();
  expect(oldVestingDate2).toBeInTheDocument();
  expect(oldVestingDate3).toBeInTheDocument();
  expect(oldVestingDate4).toBeInTheDocument();
  expect(newVestingDate1).toBeInTheDocument();
  expect(acceleratedVestingDates.length).toBe(3);
  expect(shares.length).toBe(4);
})