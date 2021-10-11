import React from 'react';
import '@testing-library/jest-dom/extend-expect'
import {act, render, waitFor} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { RecoilRoot } from 'recoil';

import ExecutiveTitle from './ExecutiveTitle';
import * as editExecutive from '../../../../api/executive/editExecutive';
import { useSetExecutiveTestData } from '../../../../tests/hooks/useSetExecutiveTestData';

const defaultExecutiveTitle = '';
const givenExecutiveTitle = 'CEO';
const descriptionText = 'Title:';
const executiveId = 1;

const InitializeState = ({ executiveId, executiveTitle }) => {
  
  const loading = useSetExecutiveTestData({ executiveId, executiveTitle });

  return loading ? null : <ExecutiveTitle executiveId={ executiveId } />

};

const component = (executiveId, executiveTitle) => (
  <RecoilRoot>
    <InitializeState executiveId={ executiveId } executiveTitle={ executiveTitle } />
  </RecoilRoot>
);

test('should render description and form if no executive title is provided', () => {
  const { getByRole, getByText } = render(component(executiveId, defaultExecutiveTitle)); 
  const description = getByText(descriptionText);
  expect(description).toBeInTheDocument();
  const input = getByRole('textbox');
  expect(input).toBeInTheDocument(); 
});


test('should render description if executive title is provided', async () => {
  const { getByText } = render(component(executiveId, givenExecutiveTitle));  
  const description = getByText(descriptionText);
  expect(description).toBeInTheDocument();
  const executiveTitle = await waitFor(() => getByText(givenExecutiveTitle));
  expect(executiveTitle).toBeInTheDocument();
});


test('should render form if Edit button is pressed', () => {
  const { getByText, getByRole } = render(component(executiveId, givenExecutiveTitle));  
  const editButton = getByText('Edit');
  expect(editButton).toBeInTheDocument();  
  userEvent.click(editButton);  
  const input = getByRole('textbox');
  expect(input).toBeInTheDocument();
});


test('should show value in form if user types in form', async () => {
  const { getByRole } = render(component(executiveId, defaultExecutiveTitle));
  const input = getByRole('textbox');
  userEvent.type(input, givenExecutiveTitle);
  await waitFor(() => expect(input).toHaveValue(givenExecutiveTitle));
});


test('should render description after submit', async () => {
  
  const spy = jest.spyOn(editExecutive, 'editExecutive').mockImplementationOnce(() => Promise.resolve({ companyName: givenExecutiveTitle }));

  const { getByRole, getByText } = render(component(executiveId, defaultExecutiveTitle));
  const input = getByRole('textbox');
  userEvent.type(input, givenExecutiveTitle);
  await act(() => userEvent.type(input, '{enter}'));
  await waitFor(() => expect(spy).toHaveBeenCalledWith(executiveId, { executiveTitle: givenExecutiveTitle }));
  const executiveTitle = await waitFor(() => getByText(givenExecutiveTitle));
  expect(executiveTitle).toBeInTheDocument();
});