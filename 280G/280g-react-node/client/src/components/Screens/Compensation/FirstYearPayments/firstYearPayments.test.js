import React, { useEffect, useState } from 'react';
import '@testing-library/jest-dom/extend-expect'
import {act, render, waitFor} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { RecoilRoot, useSetRecoilState } from 'recoil';

import FirstYearPayments from './FirstYearPayments';
import { firstYearPaymentsState } from '../../../../recoil/compensation';
import * as editCompensation from '../../../../api/compensation/editCompensation';

const InitializeState = ({ executiveId, payments }) => {
  
  const setFirstYearPayments = useSetRecoilState(firstYearPaymentsState(executiveId));
  const [ loaded, setLoaded ] = useState(false);
  const [ loading, setLoading ] = useState(true);
  
  useEffect(() => {
    if (loaded) setLoading(false);
  }, [loaded, setLoading])

  useEffect(() => {
    setFirstYearPayments(payments);
    setLoaded(true);
  }, [ payments, setFirstYearPayments, setLoaded]);
  
  return loading? null : <FirstYearPayments executiveId={ executiveId } />;

};

const component = (executiveId, payments) => (
  <RecoilRoot>
    <InitializeState executiveId={ executiveId } payments={ payments } />
  </RecoilRoot>
);

const executiveId = 1;
const defaultFirstYearPayments = '';
const validFirstYearPayments = 1000;
const nonNumericFirstYearPayments = 'a';
const nonPositiveFirstYearPayments = 0;
const descriptionText = 'Non-recurring payments in first year of employment:';
const error = 'Please enter a valid payment amount';

test('should render description and form if no first year payments is provided', () => {
  const { getByRole, getByText, queryByText } = render(component(executiveId, defaultFirstYearPayments)); 
  const description = getByText(descriptionText);
  expect(description).toBeInTheDocument();
  const input = getByRole('textbox');
  expect(input).toBeInTheDocument();
  const errorMessage = queryByText(error);
  expect(errorMessage).not.toBeInTheDocument();
});


test('should render description if first year payments are provided', () => {
  const { getByText } = render(component(executiveId, validFirstYearPayments));  
  const description = getByText(descriptionText);
  expect(description).toBeInTheDocument();
  const firstYearPayments = getByText(`$${validFirstYearPayments}`);
  expect(firstYearPayments).toBeInTheDocument();
});


test('should render form if Edit button is pressed', () => {
  const { getByText, getByRole } = render(component(executiveId, validFirstYearPayments));  
  const editButton = getByText('Edit');
  expect(editButton).toBeInTheDocument();  
  userEvent.click(editButton);  
  const input = getByRole('textbox');
  expect(input).toBeInTheDocument();
});


test('should show value in form if user types in form', () => {
  const { getByRole } = render(component(executiveId, defaultFirstYearPayments));
  const input = getByRole('textbox');
  userEvent.type(input, validFirstYearPayments.toString());
  expect(input).toHaveValue(validFirstYearPayments.toString());
});


test('should show error message if non-numeric first year payments is submitted', async () => {
  const { getByRole, getByText } = render(component(executiveId, defaultFirstYearPayments));
  const input = getByRole('textbox');
  userEvent.type(input, nonNumericFirstYearPayments);
  userEvent.type(input, '{enter}');
  const errorMessage = getByText(error);
  expect(errorMessage).toBeInTheDocument();
});


test('should show error message if non-positive transaction price is submitted', async () => {
  const { getByRole, getByText } = render(component(executiveId, defaultFirstYearPayments));
  const input = getByRole('textbox');
  userEvent.type(input, nonPositiveFirstYearPayments);
  userEvent.type(input, '{enter}');
  const errorMessage = getByText(error);
  expect(errorMessage).toBeInTheDocument();
});


test('should render description after valid submit', async () => {
  
  jest.spyOn(editCompensation, 'editCompensation').mockImplementationOnce(() => Promise.resolve({
    json: () => Promise.resolve({ firstYearPayments: validFirstYearPayments }),
  }));

  const { getByRole, getByText, queryByText } = render(component(executiveId, defaultFirstYearPayments));
  const input = getByRole('textbox');
  userEvent.type(input, validFirstYearPayments.toString());
  await act(() => userEvent.type(input, '{enter}'));
  const firstYearPayments = await waitFor(() => getByText(`$${validFirstYearPayments}`.toString()));
  expect(firstYearPayments).toBeInTheDocument();
  const errorMessage = queryByText(error);
  expect(errorMessage).not.toBeInTheDocument();
});
