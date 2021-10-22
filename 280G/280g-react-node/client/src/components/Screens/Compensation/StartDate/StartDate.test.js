import React from 'react';
import '@testing-library/jest-dom/extend-expect'
import {fireEvent, render, waitFor} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { RecoilRoot } from 'recoil';

import StartDate from './StartDate';
import * as editExecutive from '../../../../api/executive/editExecutive';
import { stringify, formatDate } from '../../../../utilities/date/date';
import { useSetCompensationTestData } from '../../../../tests/hooks/useSetCompensationTestData';

const InitializeState = ({ executiveId, startDate }) => {

  const loading = useSetCompensationTestData({ executiveId, startDate });
  
  return loading ? null : <StartDate executiveId={ executiveId } />;

};

const component = (executiveId, startDate) => (
  <RecoilRoot>
    <InitializeState executiveId={ executiveId } startDate={ startDate } />
  </RecoilRoot>
);

const defaultStartDate = '';
const givenStartDate = new Date('October 1, 2018');
const isoFormatGivenStartDate = stringify(givenStartDate)
const descriptionText = 'Employment Start Date:';
const executiveId = 12;


test('should render description and form if no start date is provided', () => {
  const { getByRole, getByText } = render(component(executiveId, defaultStartDate)); 
  const description = getByText(descriptionText);
  expect(description).toBeInTheDocument();
  const input = getByRole('textbox');
  expect(input).toBeInTheDocument(); 
});


test('should render description if start date is provided', () => {
  const { getByText } = render(component(executiveId, isoFormatGivenStartDate));  
  const description = getByText(descriptionText);
  expect(description).toBeInTheDocument();
  const startDate = getByText(formatDate(isoFormatGivenStartDate));
  expect(startDate).toBeInTheDocument();
});


test('should render form if Edit button is pressed', () => {
  const { getByText, getByRole } = render(component(executiveId, isoFormatGivenStartDate));
  const editButton = getByText('Edit');
  expect(editButton).toBeInTheDocument();  
  userEvent.click(editButton);  
  const input = getByRole('textbox');
  expect(input).toBeInTheDocument();
});

test('should render description after change', async () => {
  
  jest.spyOn(editExecutive, 'editExecutive').mockImplementationOnce(() => Promise.resolve({
    json: () => Promise.resolve({ startDate: isoFormatGivenStartDate }),
  }));

  const { getByRole, getByText } = render(component(executiveId, defaultStartDate));
  const input = getByRole('textbox');
  fireEvent.change(input, { target: { value: isoFormatGivenStartDate }});
  const startDate = await waitFor(() => getByText(formatDate(isoFormatGivenStartDate)));
  expect(startDate).toBeInTheDocument();
});