import React from 'react';
import '@testing-library/jest-dom/extend-expect'
import { render, waitFor } from '@testing-library/react'
import { RecoilRoot, useRecoilValue } from 'recoil';

import { stringify, formatDate } from "../utilities/date/date";
import { startDateState, firstYearPaymentsState, basePeriodCompensationState } from '../recoil/compensation';
import { useSetCompensationTestData } from '../tests/hooks/useSetCompensationTestData';
import * as fetchCompensation from '../api/compensation/fetchCompensation';

import { useLoadCompensation } from './useLoadCompensation';

const UseLoadCompensationTest = ({ executiveId }) => {

  const { status } = useLoadCompensation(executiveId);

  const startDate = useRecoilValue(startDateState(executiveId));
  const firstYearPayments = useRecoilValue(firstYearPaymentsState(executiveId));
  const basePeriodCompensation = useRecoilValue(basePeriodCompensationState(executiveId));

  if (status === 'loading') return <p>Loading</p>;

    return (
      <>
        <p>{ formatDate(startDate) }</p>
        <p>{ firstYearPayments }</p>
        { basePeriodCompensation.map((year) => <p key={ year.year }>{ `${year.year} compensation: ${year.compensation}` }</p>) }
      </>
    );

};

const InitializeState = ({ compensationData }) => {
  const { executiveId, startDate, firstYearPayments, basePeriodCompensation } = compensationData;
  const loading = useSetCompensationTestData({ executiveId, startDate, firstYearPayments, basePeriodCompensation  });
  return (loading) ? null : <UseLoadCompensationTest executiveId={ executiveId } />
};

const Component = ({ compensationData }) => (
  <RecoilRoot>
    <InitializeState compensationData={ compensationData } />
  </RecoilRoot>
);

test('should show compensation if already loaded', async () => {

  const executiveId = 1;
  const startDate = stringify(new Date('January 1, 2019'));
  const firstYearPayments = 10;
  const basePeriodCompensation = [
    { year: 2019, compensation: 20 },
    { year: 2020, compensation: 30 }
  ];
  
  const compensationData = { executiveId, startDate, firstYearPayments, basePeriodCompensation };
   
  const { getByText } = render(<Component compensationData = { compensationData } />);
  
  await waitFor(() => {
    const start = getByText('1 Jan 2019');
    const firstYear = getByText(10);
    const compensationYear2019 = getByText('2019 compensation: 20');
    const compensationYear2020 = getByText('2020 compensation: 30');
    expect(start).toBeInTheDocument();
    expect(firstYear).toBeInTheDocument();
    expect(compensationYear2019).toBeInTheDocument();
    expect(compensationYear2020).toBeInTheDocument();
  });

});

test('should load compensation if not yet loaded', async () => {
  
  const executiveId = 1;
  const startDate = '';
  const firstYearPayments = '';
  const basePeriodCompensation = [];

  const compensationData = { executiveId, startDate, firstYearPayments, basePeriodCompensation }

  jest.spyOn(fetchCompensation, 'fetchCompensation').mockImplementation(() => Promise.resolve({
      startDate: stringify(new Date('January 1, 2019')),
      firstYearPayments: 10,
      basePeriodCompensation: [
        { year: 2019, compensation: 20 },
        { year: 2020, compensation: 30 }
      ]
  }));
  
  const { getByText } = render(<Component compensationData = { compensationData } />);
  await waitFor(() => {
    const start = getByText('1 Jan 2019');
    const firstYear = getByText(10);
    const compensationYear2019 = getByText('2019 compensation: 20');
    const compensationYear2020 = getByText('2020 compensation: 30');
    expect(start).toBeInTheDocument();
    expect(firstYear).toBeInTheDocument();
    expect(compensationYear2019).toBeInTheDocument();
    expect(compensationYear2020).toBeInTheDocument();
  });

});
