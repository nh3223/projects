import React, { useEffect, useState } from 'react';
import '@testing-library/jest-dom/extend-expect'
import {act, render, waitFor} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { RecoilRoot, useSetRecoilState } from 'recoil';

import BasePeriodCompensation from './BasePeriodCompensation';
import { basePeriodCompensationState, startDateState } from '../../../../recoil/compensation';
import { stringify } from '../../../../utilities/formatDate';
import * as editCompensation from '../../../../api/compensation/editCompensation';

const InitializeState = ({ executiveId, startDate, basePeriodCompensation }) => {

  const setStartDate = useSetRecoilState(startDateState(executiveId));
  const setBasePeriodCompensation = useSetRecoilState(basePeriodCompensationState(executiveId));
  const [ loaded, setLoaded ] = useState(false);
  const [ loading, setLoading ] = useState(true);
    
  useEffect(() => {
    if (loaded) setLoading(false)
  }, [loaded, setLoading])

  useEffect(() => {
    setStartDate(startDate);
    setBasePeriodCompensation(basePeriodCompensation);
    setLoaded(true);
  }, [startDate, basePeriodCompensation, setStartDate, setBasePeriodCompensation, setLoaded])

  return loading ? null : <BasePeriodCompensation executiveId={ executiveId } />

}

const component = (executiveId, startDate, basePeriodCompensation) => (
  <RecoilRoot>
    <InitializeState executiveId={ executiveId } startDate={ startDate } basePeriodCompensation={ basePeriodCompensation } />
  </RecoilRoot>
);

const executiveId = 3;
const startDate = stringify(new Date('July 1, 2018'));
const error = 'Please enter a valid compensation amount';

test('should render subtitle and base Period Compensation', () => {
  const basePeriodCompensation = { 
    2018: 100,
    2019: 200,
    2020: 300
  };
  const { getByText } = render(component(executiveId, startDate, basePeriodCompensation));
  const subTitle = getByText('Annual Compensation');
  const middleYear = getByText('2019:');
  const middleCompensation = getByText('$200');
  expect(subTitle).toBeInTheDocument();
  expect(middleYear).toBeInTheDocument();
  expect(middleCompensation).toBeInTheDocument();
});

test('should render compensation input boxes', () => {
  const basePeriodCompensation = { };
  const { getAllByRole } = render(component(executiveId, startDate, basePeriodCompensation));
  const compensationInputs = getAllByRole('textbox');
  compensationInputs.every((input) => expect(input).toBeInTheDocument());
  expect(compensationInputs.length).toBe(3);
});

test('should render compensation descriptions and input box', () => {
  const basePeriodCompensation = { 
    2019: 200,
    2020: 300
  };
  const { getByRole, getByText } = render(component(executiveId, startDate, basePeriodCompensation));
  const compensationInput = getByRole('textbox');
  const middleYear = getByText('2019:');
  const middleCompensation = getByText('$200');
  expect(compensationInput).toBeInTheDocument();
  expect(middleYear).toBeInTheDocument();
  expect(middleCompensation).toBeInTheDocument();
});

test('should render description after valid submit', async () => {
  
  const spy = jest.spyOn(editCompensation, 'editCompensation').mockImplementationOnce(() => Promise.resolve({
    json: () => Promise.resolve({ }),
  }));

  const basePeriodCompensation = { 
    2019: 200,
    2020: 300
  };
  const compensation = [
    { year: 2018, compensation: 100 },
    { year: 2019, compensation: 200 },
    { year: 2020, compensation: 300 }
  ];
  const annualCompensation = 100;
  const { getByRole, getByText, queryByText } = render(component(executiveId, startDate, basePeriodCompensation));

  const compensationInput = getByRole('textbox');
  userEvent.type(compensationInput, annualCompensation.toString());
  await act(() => userEvent.type(compensationInput, '{enter}'));
  expect(spy).toHaveBeenCalledWith(compensation);
  const compensationAmount = await waitFor(() => getByText(`$${annualCompensation.toString()}`));
  expect(compensationAmount).toBeInTheDocument();
  const errorMessage = queryByText(error);
  expect(errorMessage).not.toBeInTheDocument();
});