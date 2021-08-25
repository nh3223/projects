import React, { useEffect, useState } from 'react';
import '@testing-library/jest-dom/extend-expect'
import {act, render, waitFor} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { RecoilRoot, useSetRecoilState } from 'recoil';

import ExecutiveName from './ExecutiveName';
import { executiveNameState } from '../../../../../recoil/executive';
import * as editExecutive from '../../../../../api/executive/editExecutive';

const defaultExecutiveName = '';
const givenExecutiveName = 'John Doe';
const descriptionText = 'Name:';
const executiveId = 1;

const InitializeState = ({ executiveId, name }) => {
  
  const setExecutiveName = useSetRecoilState(executiveNameState(executiveId));
  const [ loaded, setLoaded ] = useState(false);
  const [ loading, setLoading ] = useState(true);
  
  useEffect(() => {
    if (loaded) setLoading(false)
  }, [loaded, setLoading])

  useEffect(() => {
    setExecutiveName(name);
    setLoaded(true);
  }, [name, setExecutiveName, setLoaded]);

  return loading ? null : <ExecutiveName executiveId={ executiveId } />

};

const component = (executiveId, executiveName) => (
  <RecoilRoot>
    <InitializeState executiveId={ executiveId } name={ executiveName } />
  </RecoilRoot>
);

test('should render description and form if no executive name is provided', () => {
  const { getByRole, getByText } = render(component(executiveId, defaultExecutiveName)); 
  const description = getByText(descriptionText);
  expect(description).toBeInTheDocument();
  const input = getByRole('textbox');
  expect(input).toBeInTheDocument(); 
});


test('should render description if executive name is provided', async () => {
  const { getByText } = render(component(executiveId, givenExecutiveName));  
  const description = getByText(descriptionText);
  expect(description).toBeInTheDocument();
  const executiveName = await waitFor(() => getByText(givenExecutiveName));
  expect(executiveName).toBeInTheDocument();
});


test('should render form if Edit button is pressed', () => {
  const { getByText, getByRole } = render(component(executiveId, givenExecutiveName));  
  const editButton = getByText('Edit');
  expect(editButton).toBeInTheDocument();  
  userEvent.click(editButton);  
  const input = getByRole('textbox');
  expect(input).toBeInTheDocument();
});


test('should show value in form if user types in form', async () => {
  const { getByRole } = render(component(executiveId, defaultExecutiveName));
  const input = getByRole('textbox');
  userEvent.type(input, givenExecutiveName);
  await waitFor(() => expect(input).toHaveValue(givenExecutiveName));
});


test('should render description after submit', async () => {
  
  const spy = jest.spyOn(editExecutive, 'editExecutive').mockImplementationOnce(() => Promise.resolve({ companyName: givenExecutiveName }));

  const { getByRole, getByText } = render(component(executiveId, defaultExecutiveName));
  const input = getByRole('textbox');
  userEvent.type(input, givenExecutiveName);
  await act(() => userEvent.type(input, '{enter}'));
  await waitFor(() => expect(spy).toHaveBeenCalledWith(executiveId, { executiveName: givenExecutiveName }));
  const executiveName = await waitFor(() => getByText(givenExecutiveName));
  expect(executiveName).toBeInTheDocument();
});
