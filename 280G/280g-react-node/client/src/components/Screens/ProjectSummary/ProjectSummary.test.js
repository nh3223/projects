import React from 'react';
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import { RecoilRoot } from 'recoil';

import ProjectSummary from './ProjectSummary';

import { stringify } from '../../../utilities/date/date';
import { useSetProjectData } from '../../../tests/hooks/useSetProjectData';
import { BrowserRouter } from 'react-router-dom';

const InitializeState = ({ company, executiveIds, executives, compensation, nonEquityPayments, grants, vesting }) => {
  
  const loading = useSetProjectData(company, executiveIds, executives, compensation, nonEquityPayments, grants, vesting)
  return loading ? null : <ProjectSummary />;
};

const component = (company, executiveIds, executives, compensation, nonEquityPayments, grants, vesting) => (
  <RecoilRoot>
    <BrowserRouter>
      <InitializeState company={ company } executiveIds={ executiveIds } executives={ executives } 
                       compensation={ compensation } nonEquityPayments={ nonEquityPayments } grants={ grants }  vesting={ vesting }/>
    </BrowserRouter>
  </RecoilRoot>
);

// Variables

const companyId = 12
const company = { 
  companyId,
  companyName: 'Test Company',
  transactionDate: stringify(new Date('December 1, 2021')),
  transactionPrice: 10
}

const executiveIds = {
  companyId: 12,
  executiveIds: [0, 1]
};

const executives = [
  { executiveId: 0, executiveName: 'John', executiveTitle: 'CEO' },
  { executiveId: 1, executiveName: 'Mary', executiveTitle: 'CFO' }
];

const compensation = [
  { executiveId: 0,
    startDate: stringify(new Date('July 1, 2015')),
    basePeriodCompensation: [
      { year: 2016, compensation: 100 },
      { year: 2017, compensation: 100 },
      { year: 2018, compensation: 100 },
      { year: 2019, compensation: 100 },
      { year: 2020, compensation: 100 }
    ]
  },
  { executiveId: 1,
    startDate: stringify(new Date('July 1, 2015')),
    basePeriodCompensation: [
      { year: 2016, compensation: 200 },
      { year: 2017, compensation: 200 },
      { year: 2018, compensation: 200 },
      { year: 2019, compensation: 200 },
      { year: 2020, compensation: 200 }
    ]
  }
];

const nonEquityPayments = [
  { executiveId: 0, paymentIds: [102, 103] },
  { executiveId: 1, paymentIds: [104, 105] },
  { paymentId: 102, paymentAmount: 10 },
  { paymentId: 103, paymentAmount: 20 },
  { paymentId: 104, paymentAmount: 300 },
  { paymentId: 105, paymentAmount: 400 }
];

const grants = [
  { executiveId: 0, grantIds: [1002, 1003] },
  { executiveId: 1, grantIds: [1004, 1005] },
  { grantId: 1002, grantType: 'Restricted Stock', grantDate: stringify(new Date('January 1, 2021')), vestingStartDate: stringify(new Date('January 1, 2021')),
    numberShares: 5,  changeOfControl: false, cliff: false, acceleration: true, accelerationPercentage: 100, remainderType: 'Annually', remainderPeriods: 1 },
  { grantId: 1003, grantType: 'Restricted Stock', grantDate: stringify(new Date('January 1, 2021')), vestingStartDate: stringify(new Date('January 1, 2021')),
    numberShares: 10, changeOfControl: false, cliff: false, acceleration: true, accelerationPercentage: 100, remainderType: 'Annually', remainderPeriods: 1 },
  { grantId: 1004, grantType: 'Restricted Stock', grantDate: stringify(new Date('January 1, 2021')), vestingStartDate: stringify(new Date('January 1, 2021')),
    numberShares: 15, changeOfControl: false, cliff: false, acceleration: true, accelerationPercentage: 100, remainderType: 'Annually', remainderPeriods: 1 },
  { grantId: 1005, grantType: 'Restricted Stock', grantDate: stringify(new Date('January 1, 2021')), vestingStartDate: stringify(new Date('January 1, 2021')),
    numberShares: 20, changeOfControl: false, cliff: false, acceleration: true, accelerationPercentage: 100, remainderType: 'Annually', remainderPeriods: 1 }
]

const vesting = [
  'placeholder',
  'placeholder',
  { grantId: 1002, vestingSchedule: [{ oldVestingDate: stringify(new Date('January 1, 2022')), newVestingDate: stringify(new Date('December 1, 2021')), shares: 5 }] },
  { grantId: 1003, vestingSchedule: [{ oldVestingDate: stringify(new Date('January 1, 2022')), newVestingDate: stringify(new Date('December 1, 2021')), shares: 10 }] },
  { grantId: 1004, vestingSchedule: [{ oldVestingDate: stringify(new Date('January 1, 2022')), newVestingDate: stringify(new Date('December 1, 2021')), shares: 15 }] },
  { grantId: 1005, vestingSchedule: [{ oldVestingDate: stringify(new Date('January 1, 2022')), newVestingDate: stringify(new Date('December 1, 2021')), shares: 20 }] },
];

// Mocks

jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useParams: () => ({ companyId })
}));

jest.mock('../../../hooks/useLoadProject', () => ({ 
  useLoadProject: () => ({ loading: false, error: null })
}));

// Tests

test('should display company name, transaction date and transaction price', () => {

  const { getByText } = render(component(company, executiveIds, executives, compensation, nonEquityPayments, grants, vesting));

  const companyName = getByText('Test Company');
  const transactionDate = getByText('Transaction Date: 1 Dec 2021');
  const transactionPrice = getByText('Transaction Price Per Share: $10');

  expect(companyName).toBeInTheDocument();
  expect(transactionDate).toBeInTheDocument();
  expect(transactionPrice).toBeInTheDocument();
  
});

test('should display executive names and titles', () => {

  const { getByText } = render(component(company, executiveIds, executives, compensation, nonEquityPayments, grants, vesting));

  const executive0 = getByText('John, CEO');
  const executive1 = getByText('Mary, CFO');

  expect(executive0).toBeInTheDocument();
  expect(executive1).toBeInTheDocument();

});

test('should display base amount and parachute threshold', () => {

  const { getByText } = render(component(company, executiveIds, executives, compensation, nonEquityPayments, grants, vesting));

  const executive0baseAmount = getByText('Base Amount: $100');
  const executive1baseAmount = getByText('Base Amount: $200');
  const executive0parachute = getByText('Parachute Threshold: $300');
  const executive1parachute = getByText('Parachute Threshold: $600');

  expect(executive0baseAmount).toBeInTheDocument();
  expect(executive1baseAmount).toBeInTheDocument();
  expect(executive0parachute).toBeInTheDocument();
  expect(executive1parachute).toBeInTheDocument();

});

test('should display total payments', () => {

  const { getByText } = render(component(company, executiveIds, executives, compensation, nonEquityPayments, grants, vesting));

  const nonEquityPayments0 = getByText('Total Non-Equity Payments: $30');
  const nonEquityPayments1 = getByText('Total Non-Equity Payments: $700');
  const equityPayments0 = getByText('Total Equity Grant Payments: $1.55');
  const equityPayments1 = getByText('Total Equity Grant Payments: $3.62');
  const totalPayments0 = getByText('Total Payments: $31.55');
  const totalPayments1 = getByText('Total Payments: $703.62');

  expect(nonEquityPayments0).toBeInTheDocument();
  expect(nonEquityPayments1).toBeInTheDocument();
  expect(equityPayments0).toBeInTheDocument();
  expect(equityPayments1).toBeInTheDocument();
  expect(totalPayments0).toBeInTheDocument();
  expect(totalPayments1).toBeInTheDocument();

});

