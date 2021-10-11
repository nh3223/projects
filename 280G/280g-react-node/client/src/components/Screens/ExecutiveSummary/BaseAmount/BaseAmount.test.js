import React from 'react';
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import { RecoilRoot } from 'recoil';

import BaseAmount from './BaseAmount';

import { useSetCompensationTestData } from '../../../../tests/hooks/useSetCompensationTestData';
import { stringify } from '../../../../utilities/date/date';

const InitializeState = ({ executiveId, startDate, firstYearPayments, compensation }) => {
  
  const loading = useSetCompensationTestData({ executiveId, startDate, firstYearPayments, basePeriodCompensation });
  
  return loading? null : <BaseAmount executiveId={ executiveId } />;

};

const component = (executiveId, startDate, firstYearPayments, basePeriodCompensation) => (
  <RecoilRoot>
    <InitializeState executiveId={ executiveId } startDate={ startDate } firstYearPayments={ firstYearPayments } compensation={ basePeriodCompensation } />
  </RecoilRoot>
);

const executiveId = 3;
const startDate = stringify(new Date('September 1, 2010'));
const firstYearPayments = 0;
const basePeriodCompensation = [
  { year: 2018, compensation: 1000 },
  { year: 2019, compensation: 3000 },
  { year: 2020, compensation: 5000 }
];

test('should display base amount and parachute threshold', () => {
  
  const { getByText } = render(component(executiveId, startDate, firstYearPayments, basePeriodCompensation));
  
  const baseAmount = getByText('Base Amount: $3000');
  const parachuteThreshold = getByText('Parachute Threshold: $9000');
  expect(baseAmount).toBeInTheDocument();
  expect(parachuteThreshold).toBeInTheDocument();
});


test('should display base period compensation', () => {
  
  const { getByText } = render(component(executiveId, startDate, firstYearPayments, basePeriodCompensation));const year1 = getByText(basePeriodCompensation[0].year);
  
  const compensation1 = getByText(`$${basePeriodCompensation[0].compensation}`)
  const year2 = getByText(basePeriodCompensation[1].year);
  const compensation2 = getByText(`$${basePeriodCompensation[1].compensation}`)
  const year3 = getByText(basePeriodCompensation[2].year);
  const compensation3 = getByText(`$${basePeriodCompensation[2].compensation}`)
  expect(year1).toBeInTheDocument();
  expect(compensation1).toBeInTheDocument();
  expect(year2).toBeInTheDocument();
  expect(compensation2).toBeInTheDocument();
  expect(year3).toBeInTheDocument();
  expect(compensation3).toBeInTheDocument();
});


test('should display first year annualization information', () => {
  
  const { getByText } = render(component(executiveId, startDate, firstYearPayments, basePeriodCompensation));

  const start = getByText(`Start Date: 1 Sep 2010`);
  const first = getByText(`First Year Payments: $0`);
  const annual = getByText(`Annualized First Year Compensation: $1000`);
  expect(start).toBeInTheDocument();
  expect(first).toBeInTheDocument();
  expect(annual).toBeInTheDocument();
});

